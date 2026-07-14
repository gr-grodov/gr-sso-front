import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {CardWithBanner} from "@/widgets/CardWithBanner";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/CardWithBanner">
        <CardWithBanner/>
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;