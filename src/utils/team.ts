import { JobFunction, Team, User, UserJobFunction } from "@/types"
import { primitiveStrength } from "./configTeams"

export class CalcTeam {
  strengthTeam({ jobFunctions }: { jobFunctions?: JobFunction[] }) {
    if (!jobFunctions) {
      return
    }
    const strengthTeam = jobFunctions.map((jobFunction: JobFunction) => {
      const total = jobFunction.userJobFunction.reduce((acc: number, userJobFunction: UserJobFunction) => {
        return (acc += userJobFunction.weight * jobFunction.deliverys)
      }, 0)

      return { jobFunction: jobFunction.name, strength: total }
    })


    return strengthTeam
  }

  defaultDelivers({ jobFunctions }: { jobFunctions?: JobFunction[] }) {
    if (!jobFunctions) {
      return
    }

    const strength = jobFunctions.reduce((delivery: { desenvolvimento: number, copys: number, videos: number, design: number, emails: number, vendas: number, lps: number }, jobFunction: JobFunction) => {

      const { default: values } = primitiveStrength.reduce((mostSimilar: { jobFunction: JobFunction | null, similarity: number, default: any }, primitive: any) => {
        const similarity = this.similarityPercentage(jobFunction.name.toLocaleLowerCase(), primitive.job.toLocaleLowerCase())
        if (similarity > mostSimilar.similarity) {
          return { jobFunction, similarity, default: primitive };
        } else {
          return mostSimilar;
        }
      }, { jobFunction: null, similarity: 0, default: null })

      delivery.desenvolvimento += values.category.reduce((acc: number, value: any) => {
        if (value.name === "Desenvolvimento") {
          return acc += jobFunction.deliverys * value.weight
        }
        return acc
      }, 0)

      delivery.design += values.category.reduce((acc: number, value: any) => {
        if (value.name === "Design") {
          return acc += jobFunction.deliverys * value.weight
        }
        return acc
      }, 0)

      delivery.copys += values.category.reduce((acc: number, value: any) => {
        if (value.name === "Copys") {
          return acc += jobFunction.deliverys * value.weight
        }
        return acc
      }, 0)

      delivery.emails += values.category.reduce((acc: number, value: any) => {
        if (value.name === "Emails") {
          return acc += jobFunction.deliverys * value.weight
        }
        return acc
      }, 0)

      delivery.vendas += values.category.reduce((acc: number, value: any) => {
        if (value.name === "Vendas") {
          return acc += jobFunction.deliverys * value.weight
        }
        return acc
      }, 0)

      delivery.videos += values.category.reduce((acc: number, value: any) => {
        if (value.name === "Videos") {
          return acc += jobFunction.deliverys * value.weight
        }
        return acc
      }, 0)

      delivery.lps += values.category.reduce((acc: number, value: any) => {
        if (value.name === "LPs") {
          return acc += jobFunction.deliverys * value.weight
        }
        return acc
      }, 0)

      return delivery

    }, { desenvolvimento: 0, copys: 0, videos: 0, design: 0, emails: 0, vendas: 0, lps: 0 })



    return strength

  }


  private progress({ desenvolvimento, copys, videos, design, emails, vendas, lps }: { desenvolvimento: number, copys: number, videos: number, design: number, emails: number, vendas: number, lps: number }) {

  }

  private similarityPercentage(a: string, b: string): number {
    const distance = this.levenshteinDistance(a, b);
    const maxLength = Math.max(a.length, b.length);
    const similarity = 1 - distance / maxLength;
    return similarity * 100; // Multiplicado por 100 para obter a porcentagem
  }

  private levenshteinDistance(a: string, b: string): number {
    const distances = new Array(a.length + 1);
    for (let i = 0; i <= a.length; i++) {
      distances[i] = new Array(b.length + 1);
    }

    for (let i = 0; i <= a.length; i++) {
      distances[i][0] = i;
    }
    for (let j = 0; j <= b.length; j++) {
      distances[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          distances[i][j] = distances[i - 1][j - 1];
        } else {
          distances[i][j] = Math.min(distances[i - 1][j], distances[i][j - 1], distances[i - 1][j - 1]) + 1;
        }
      }
    }

    return distances[a.length][b.length];
  }


}
