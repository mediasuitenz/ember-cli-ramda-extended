module.exports = {
  description: '',
  normalizeEntityName () {},

  afterInstall () {
    return this.addBowerPackageToProject('ramda-extended', '0.2.1')
  }
};
