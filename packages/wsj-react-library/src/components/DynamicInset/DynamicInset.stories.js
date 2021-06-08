import DynamicInset from './index';

export default {
  title: 'Dynamic Inset',
  component: DynamicInset,
};

const Template = (args) => <DynamicInset {...args} />;

export const Chartlos = Template.bind({});
Chartlos.args = {
  url:
    'https://asset.wsj.net/dynamic-insets/charts/cdc_90c531026604af46dd4972c9.json',
};

export const Recipes = Template.bind({});
Recipes.args = {
  url:
    'https://asset.wsj.net/wsjnewsgraphics/projects/narrator/421352c3-fa36-44ee-b666-4a7de097ae84.json',
};

export const Origami = Template.bind({});
Origami.args = {
  url:
    'https://asset.wsj.net/wsjnewsgraphics/projects/narrator/a4fd4122-fc37-4e20-9e2c-c0fa2ffcec8c.json',
};

export const SeriesNavigation = Template.bind({});
SeriesNavigation.args = {
  url:
    'https://asset.wsj.net/wsjnewsgraphics/projects/narrator/5fa60541-b3dc-4a5a-8140-325164707138.json',
};

export const ParallaxGallery = Template.bind({});
ParallaxGallery.args = {
  url:
    'https://asset.wsj.net/wsjnewsgraphics/projects/narrator/e855e162-55b0-4eff-bb62-be025562eadd.json',
};

export const Ai2Html = Template.bind({});
Ai2Html.args = {
  url:
    'https://asset.wsj.net/wsjnewsgraphics/ai2html/c1008c54-538b-4ffc-b8ea-eee6b76c97d1.json',
};

export const Form = Template.bind({});
Form.args = {
  url:
    'https://asset.wsj.net/wsjnewsgraphics/newsroom-feedback/1f2c024e-3924-4f8f-be64-aa470f32174f.json',
};
