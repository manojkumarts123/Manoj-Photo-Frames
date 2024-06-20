const Loading = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    preserveAspectRatio="xMidYMid"
    style={{
      shapeRendering: "auto",
      display: "block",
      background: "transparent",
    }}
    viewBox="0 0 100 100"
    {...props}
  >
    <circle cx={50} cy={50} r={0} fill="none" stroke="#841818" strokeWidth={4}>
      <animate
        attributeName="r"
        begin="0s"
        calcMode="spline"
        dur="1s"
        keySplines="0 0.2 0.8 1"
        keyTimes="0;1"
        repeatCount="indefinite"
        values="0;40"
      />
      <animate
        attributeName="opacity"
        begin="0s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0 0.8 1"
        keyTimes="0;1"
        repeatCount="indefinite"
        values="1;0"
      />
    </circle>
    <circle cx={50} cy={50} r={0} fill="none" stroke="#ffa0a0" strokeWidth={4}>
      <animate
        attributeName="r"
        begin="-0.5s"
        calcMode="spline"
        dur="1s"
        keySplines="0 0.2 0.8 1"
        keyTimes="0;1"
        repeatCount="indefinite"
        values="0;40"
      />
      <animate
        attributeName="opacity"
        begin="-0.5s"
        calcMode="spline"
        dur="1s"
        keySplines="0.2 0 0.8 1"
        keyTimes="0;1"
        repeatCount="indefinite"
        values="1;0"
      />
    </circle>
  </svg>
)

export default Loading