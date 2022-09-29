const mix = (superclass: any) => new MixinBuilder(superclass);

class MixinBuilder {
  superclass: any;

  constructor(superclass: any) {
    this.superclass = superclass;
  }

  with(...mixins: any[]) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }
}

export default mix;
