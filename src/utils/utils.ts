import { receitaWs } from "@/lib/axios"
import { AxiosError, AxiosResponse } from "axios"
import { z } from "zod";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { OkrObjectiveProject, OkrProject, OkrProjectHistory } from "@/types";

dayjs.extend(utc);
dayjs.extend(timezone);
const availableServices = ["LPS", "Design", "Vídeos", "Bi", "E-mails", "Copy"]

export interface CnpjProps {
  abertura: string;
  situacao: string;
  tipo: string;
  nome: string;
  fantasia: string;
  porte: string;
  natureza_juridica: string;
  atividade_principal: Atividade[];
  logradouro: string;
  numero: string;
  municipio: string;
  bairro: string;
  uf: string;
  cep: string;
  email: string;
  telefone: string;
  data_situacao: string;
  cnpj: string;
  ultima_atualizacao: Date;
  status: string;
  complemento: string;
  efr: string;
  motivo_situacao: string;
  situacao_especial: string;
  data_situacao_especial: string;
  atividades_secundarias: Atividade[];
  capital_social: string;
  qsa: any[];
  extra: Extra;
  billing: Billing;
}

export interface Atividade {
  code: string;
  text: string;
}

export interface Billing {
  free: boolean;
  database: boolean;
}

export interface Extra {
}

type okrStatus = "completed" | "notCompleted" | "completedOutOfDate"|"running";

export class Utils {

  calcProgressOkr(okr: OkrProject): number {
    if (!okr) return 0;
  
  
    const krHistory = [...okr.kr].sort((a: OkrProjectHistory, b: OkrProjectHistory) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
  
      return dateB - dateA;
    });

    if (krHistory.length === 0) return 0;

    return Math.round(Math.abs(krHistory[0].target / krHistory[0].progress) * 100);
  }
  

  calcStatusOkr(okr: OkrProject, okrObjective: OkrObjectiveProject): okrStatus {
    const progress = this.calcProgressOkr(okr);
    const today = new Date();
    const finishedAt = new Date(okrObjective.finishedAt);
  
    // Se o progresso for 100% e a data atual for após a data de finalização, retorna 'completedLate'
    if (progress >= 100 && today > finishedAt) {
      return "completedOutOfDate";
    }
  
    // Se a data atual for maior que a data de finalização e o progresso for menor que 100%, retorna 'notCompleted'
    else if (today > finishedAt && progress < 100) {
      return "notCompleted";
    }

    else if (today < finishedAt && progress < 100) {
      return "running";
    }
  
    // Se o progresso for 100%, retorna 'completed', caso contrário 'notCompleted'
    return progress >= 100 ? "completed" : "notCompleted";
  }
  

  async validateCnpj({ cnpj }: { cnpj: string }): Promise<CnpjProps | void> {

    const schema = z.object({
      cnpj: z.string().transform((value) => {

        const sanitizeToNumbers = (cnpj: string) => {
          return cnpj.replace(/\D/g, "");
        };

        return this.isCNPJ(value) ? sanitizeToNumbers(value) : false

      })
    })

    const validatedCNPJ = schema.parse({ cnpj });
    if (validatedCNPJ.cnpj === false) {
      return
    }
    receitaWs.get(`/${validatedCNPJ.cnpj}`).then((resp: AxiosResponse) => {
      return resp.data
    }).catch((error: AxiosError) => {
      return
    })


  }

  ufToString({ text }: { text?: string }) {
    const regex = /\(([A-Z]{2})\)/
    const match = text?.match(regex)
    return (match && match[1]) ?? "n/a"
  }

  cleanString({ text }: { text?: string }) {
    const regex = /["[\]]/g
    const match = text?.replace(regex, "")
    return match ?? "n/a"
  }

  formatToDDMMAAAA(dateString: string | number | Date) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  }

  formatDateWithTimeZone(isoDateString: string) {
    const date = dayjs(isoDateString).tz("America/Campo_Grande");
    const formattedDate = date.format("DD/MM/YYYY HH:mm");
    return formattedDate;
  }

  formatReceivedClient({ content }: { content: any }) {

    const services = availableServices.map((service: any) => {
      return { name: service, quantity: 0 }
    })
    return {
      id: content?.card_id,
      city: content?.cidade ?? content?.addressCity ?? "n/a",
      clientFantasyName: content?.clientFantasyName ?? content?.client ?? this.cleanString({ text: content?.cliente_database }),
      clientName: content?.client ?? this.cleanString({ text: content?.cliente_database }),
      fee: content?.fee ?? content?.valor_do_deal ?? 0,
      investment: content?.valor_do_deal ?? 0,
      segment: content?.segment ?? content?.segmento ?? "n/a",
      services,
      state: content?.addressState ?? this.ufToString({ text: content?.addressState }),
      thumbUrl:
        content?.thumb_url ??
        "https://comoequetala.com.br/images/com_vagasejobs/empresa/marca/95-fd774b66ded35144e6fc1cddfb13902c.png",
      socialReason: content?.social_reason ?? content?.socialReason ?? "n/a",
      cnpj: content?.cnpj ?? "n/a",
      bornDate: content?.born_date ?? null,
      address: content?.estado_uf ?? "n/a",
      addressComplement: content?.addressComplement ?? "n/a",
      addressDistrict: content?.addressDistrict ?? "n/a",
      addressZipCode: content?.addressZipCode ?? "n/a",
      addressCity: content?.cidade ?? "n/a",
      addressState: this.ufToString({ text: content?.estado_uf ?? content?.addressState }),
    }
  }

 
  formatCurrency(value: number): string {
    const options = {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,



    };

    return value.toLocaleString("pt-BR", options);
  }

  projectLifeTimeInMonths(startDate: Date) {
    const date = new Date(startDate);
    const today = new Date();

    const yearsDiff = today.getFullYear() - date.getFullYear();
    const monthsDiff = today.getMonth() - date.getMonth();

    const totalMonths = yearsDiff * 12 + monthsDiff;

    return totalMonths;
  }

  calcDaysToFinish(FinishedAt: Date) {
    const date = new Date(FinishedAt);
    const today = new Date();

    const timeDiff = Math.abs(date.getTime() - today.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
  }

  private regexCNPJ = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/

  private isCNPJ(value: string | number | number[] = "") {
    if (!value) return false

    const isString = typeof value === "string"
    const validTypes = isString || Number.isInteger(value) || Array.isArray(value)

    if (!validTypes) return false

    if (isString) {
      const digitsOnly = /^\d{14}$/.test(value)
      const validFormat = this.regexCNPJ.test(value)
      const isValid = digitsOnly || validFormat

      if (!isValid) return false
    }

    const numbers = this.matchNumbers(value)

    if (numbers.length !== 14) return false

    const items = Array.from(new Set(numbers));
    if (items.length === 1) return false

    const digits = numbers.slice(12)

    const digit0 = this.validCalc(12, numbers)
    if (digit0 !== digits[0]) return false

    const digit1 = this.validCalc(13, numbers)
    return digit1 === digits[1]
  }

  private matchNumbers(value: string | number | number[] = "") {
    const match = value.toString().match(/\d/g)
    return Array.isArray(match) ? match.map(Number) : []
  }

  private validCalc(x: number, numbers: number[]) {
    const slice = numbers.slice(0, x)
    let factor = x - 7
    let sum = 0

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i]
      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result
  }


}