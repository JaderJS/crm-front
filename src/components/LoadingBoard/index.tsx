import Skeleton from "react-loading-skeleton"

export function LoadingBoard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
        marginTop: ".5rem",
        transition: "all ease-in-out 0.5s",
      }}
    >
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}

          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "20.75rem",
            height: "100%",
            padding: "1.25rem",
            position: "relative",
            paddingTop: "0",
          }}
        >
       
          <Skeleton
            style={{
              backgroundColor: "#EEE",
              width: "18.75rem",
              height: "5rem",
              borderRadius: "1.875rem",
              marginTop: "1.25rem",
            }}
            count={Math.floor(Math.random() * 5) + 1}
          />
        </div>
      ))}
    </div>
  )
}
