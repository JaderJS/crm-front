import { Board, Card } from "@/types"
import { InputContainer } from "./styles"
import { Cards, CopySuccess, Slash } from "iconsax-react"
import Select from "react-select"
import { BoardContainer } from "@/pages/Board/Edit/styles"
import { BoardCard } from "@/components/BoardComponents/BoardCard"
import { useEffect, useMemo, useState } from "react"
import { SuccessAndErrorSvgContainer } from "../PrimitivesRadioBoard/styles"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { RotatingLines } from "react-loader-spinner"

export interface PrimitivesBigText {
  label?: string
  text?: string
  description?: string
  required?: boolean
  defaultValue?: any
  value?: any
  onChange?: (data: any) => void
  cards?: Card[]
  [key: string]: any
  errorBoolean?: boolean | null
  errorMessage?: string
  successBoolean?: boolean | null
  disabled?: boolean
  modified?: { name?: string; updatedAt: any; uuid: string }
}

export function PrimitivesConnectionBoard({
  label,
  description,
  disabled = false,
  cards,
  onChange,
  defaultValue,
  value,
  errorBoolean,
  errorMessage,
  successBoolean,
  ...rest
}: PrimitivesBigText & { [key: string]: any }) {
  const [selectedValue, setSelectedValue] = useState<any[] | null>(null)

  const memoizedOptions = useMemo(() => {
    return cards?.map((card) => ({
      ...card,
      value: card.id,
      label: card.name,
    }))
  }, [cards])

  const formatOptionLabel = (card: Card) => (
    <BoardCard
      id={card.id.toString()}
      name={card.name}
      isOpen={false}
      draggableId={""}
      tags={card.tags}
      priority={card.priority}
      appointment={card.appointment}
      cardAssignment={card.cardAssignment}
      description={card.description}
      onOpen={() => {
        console.log("oi")
      }}
      disabled={true}
      data={card}
      styles={{
        height: "auto",
        maxHeight: "8.8125rem",
      }}
    />
  )

  const findOptions = (defaultValue: any[]) => {
    if (Array.isArray(defaultValue) && memoizedOptions) {
      return defaultValue
        .map((val) => memoizedOptions.find((memoizedOptions) => memoizedOptions.value === val))
        .filter(Boolean)
    }
    return null
  }

  // useEffect(() => {
  //   if (memoizedOptions && memoizedOptions.length > 0) {
  //     const foundOptions = findOptions(defaultValue)

  //     if (JSON.stringify(foundOptions) !== JSON.stringify(selectedValue)) {
  //       setSelectedValue(foundOptions)
  //     }
  //   }
  // }, [defaultValue, memoizedOptions])

  const handleChange = (selectedOption: any) => {
    if (disabled) return
    setSelectedValue(selectedOption)
    const values = Array.isArray(selectedOption)
      ? selectedOption.map((option: { value: any }) => option)
      : selectedOption
      ? [selectedOption.value]
      : []
    if (onChange) {
      onChange(values)
      console.log(values)
    }
  }

  return (
    <InputContainer>
      <SuccessAndErrorSvgContainer
        style={{
          position: "absolute",
          right: "1rem",
          top: "-.5rem",
        }}
      >
        {errorBoolean && <Slash color='#E0465C' />}
        {successBoolean && <CopySuccess color='#00C48C' />}
      </SuccessAndErrorSvgContainer>
      {label && <label>{label}</label>}
      {description && <span>{description}</span>}
      {!!onChange && memoizedOptions && (
        <Select
          options={memoizedOptions}
          onChange={handleChange}
          defaultValue={defaultValue}
          // value={value ? value : selectedValue}
          components={{
            DropdownIndicator: () => <Cards size={16} style={{ marginRight: "1rem" }} />,
          }}
          menuPlacement='auto'
          {...rest.register}
          formatOptionLabel={formatOptionLabel}
          isSearchable
          isClearable
          isMulti
          isDisabled={disabled}
          styles={{
            menuList: (provided) => ({
              ...provided,
              // scrollbarColor: "#7841b0 #d9d9d9",

              width: "100%",
              height: "100%",
            }),
            control: (provided, { menuIsOpen }) => ({
              ...provided,
              // maxWidth: optionMaxWidth,
              // minWidth: optionMinWidth,
              width: "100%",
              height: "100%",
              minHeight: "9.8125rem",
              borderRadius: "15px",
              border: "transparent",
              borderBottom: "1px solid #d9d9d9" || (menuIsOpen && "1px solid #7841b0"),
              fontFamily: "DM Sans",
              backgroundColor: "#FFF",
              fontSize: ".75rem",
              fontWeight: 400,
              transition: "all ease 0.2s",
              svg: {
                color: "#7841b0",
                // transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "all ease 0.2s",
              },
              "&:hover": { borderBottom: "1px solid #7841b0" },
              "&:focus": { borderBottom: "1px solid #7841b0" },
              "&:active": { borderBottom: "1px solid #7841b0" },
              "&:disabled": { borderBottom: "1px solid #d9d9d9" },
              boxShadow: "none",
              outline: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              zIndex: 0,
            }),
            menu: (provided) => ({
              ...provided,
              position: "absolute",
              border: "1px solid #7841b0",
              overflow: "hidden",
              backgroundColor: "#fff",
              zIndex: 10,
              fontSize: ".75rem",
              fontWeight: 400,
              transition: "all 0.2s",
              fontFamily: "DM Sans",

              "&:hover": {
                border: "1px solid #7841b0",
              },
              "&:focus": {
                border: "1px solid #7841b0",
                boxShadow: "0 0 0 1px #7841b0",
              },
              "&:active": {
                border: "1px solid #7841b0",
                boxShadow: "0 0 0 1px #7841b0",
              },
              "&:disabled": {
                border: "1px solid #d9d9d9",
                boxShadow: "0 0 0 1px #d9d9d9",
              },
            }),

            option: (provided, state) => ({
              ...provided,

              backgroundColor: state.isSelected ? "#7841b09d" : "#fff",
              padding: "0.5rem 1rem",
              "&:hover": {
                backgroundColor: "rgba(120, 65, 176, 0.42)",
                // color: "#fff",
                cursor: "pointer",
                transition: "all 0.2s",
              },
              "&:focus": {
                backgroundColor: "#7841b0",
                color: "#fff",
                border: "1px solid #7841b0",
              },

              "&:active": {
                backgroundColor: "#7841b0",
              },
              "&:disabled": {
                backgroundColor: "#d9d9d9",
                border: "1px solid #d9d9d9",
              },
            }),
            singleValue: (provided) => ({
              ...provided,
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: "none", // Isso irá remover o separador
              backgroundColor: "transparent", // Isso irá tornar o separador transparente
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: "rgba(120, 65, 176, 0.62)",
              paddingTop: "0.5rem",
              //   height: "fit-content",
              borderRadius: "15px",
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              height: "2rem",
              alignSelf: "top",
              width: "2rem",
              justifyContent: "center",
              color: "#fff",
              borderRadius: "0 15px 15px 0",
              //   backgroundColor: "red",

              "&:hover": {
                backgroundColor: "#7841b0",
                cursor: "pointer",
                transition: "all 0.2s",

                "& svg": {
                  color: "#fff",
                },
              },
              svg: {
                width: "1rem",
                height: "1rem",
              },
            }),

            multiValueLabel: (provided) => ({
              ...provided,
              fontWeight: 400,
              fontSize: ".75rem",
              fontFamily: "DM Sans",
            }),
          }}
        />
      )}

      {rest.modified && rest.modified.name && (
        <span style={{ fontSize: ".65rem" }}>
          Modificado por: {rest.modified.name} {format(new Date(rest.modified.updatedAt), "PPp", { locale: ptBR })}
        </span>
      )}
    </InputContainer>
  )
}
