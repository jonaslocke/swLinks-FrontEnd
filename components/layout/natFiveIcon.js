const natFiveIcon = ({ ratio, primaryColor, secondaryColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={(400 * ratio).toFixed()}
      height={(400 * ratio).toFixed()}
      viewBox="0 0 400 400"
      fill="none"
    >
      <path
        d="M205.756 3.7561L262.587 124.634C263.522 126.622 265.329 128.001 267.419 128.32L394.497 147.703C399.762 148.507 401.864 155.298 398.055 159.196L306.101 253.287C304.587 254.834 303.897 257.064 304.255 259.25L325.962 392.108C326.861 397.612 321.358 401.81 316.648 399.211L202.987 336.484C201.117 335.452 198.883 335.452 197.013 336.484L83.3515 399.211C78.6424 401.81 73.1387 397.612 74.0381 392.108L95.7454 259.25C96.1024 257.064 95.4121 254.834 93.8993 253.287L1.94538 159.196C-1.86432 155.298 0.238106 148.507 5.50296 147.703L132.58 128.32C134.671 128.001 136.478 126.622 137.413 124.634L194.244 3.7561C196.598 -1.25205 203.401 -1.25205 205.756 3.7561"
        fill={primaryColor}
      ></path>
      <path
        d="M152.645 218.469L161.336 145.812H244.441V171.398H188.094L184.871 199.621C187.215 198.254 190.275 197.049 194.051 196.008C197.892 194.966 201.635 194.445 205.281 194.445C219.409 194.445 230.249 198.645 237.801 207.043C245.418 215.376 249.227 227.095 249.227 242.199C249.227 251.314 247.176 259.582 243.074 267.004C239.038 274.361 233.341 280.025 225.984 283.996C218.628 287.967 209.936 289.953 199.91 289.953C190.991 289.953 182.625 288.13 174.812 284.484C167 280.773 160.88 275.728 156.453 269.348C152.026 262.902 149.845 255.643 149.91 247.57H182.918C183.243 252.779 184.904 256.913 187.898 259.973C190.893 263.033 194.832 264.562 199.715 264.562C210.783 264.562 216.316 256.359 216.316 239.953C216.316 224.784 209.546 217.199 196.004 217.199C188.322 217.199 182.592 219.673 178.816 224.621L152.645 218.469Z"
        fill={secondaryColor}
      ></path>
    </svg>
  );
};

export default natFiveIcon;
