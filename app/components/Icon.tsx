import SvgIconStyle from "./SvgIconStyle";

const Icon = (name: string) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export default Icon;
