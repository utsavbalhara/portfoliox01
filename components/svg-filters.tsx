export default function SvgFilters() {
  return (
    <svg className="svg-filters">
      <defs>
        <filter id="pixel-filter">
          <feFlood x="4" y="4" height="2" width="2" />
          <feComposite width="10" height="10" />
          <feTile result="a" />
          <feComposite in="SourceGraphic" in2="a" operator="in" />
          <feMorphology operator="dilate" radius="5" />
        </filter>

        <filter id="glitch">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
          />
          <feOffset dx="-3" dy="0" result="r" />
          <feOffset dx="3" dy="0" result="g" />
          <feOffset dx="0" dy="0" result="b" />
          <feBlend in="r" in2="g" mode="screen" result="blend" />
          <feBlend in="blend" in2="b" mode="screen" />
        </filter>
      </defs>
    </svg>
  )
}
