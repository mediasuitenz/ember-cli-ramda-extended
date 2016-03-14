module.exports = {
  description: '',
  normalizeEntityName () {},

  afterInstall () {
    return this.addBowerPackagesToProject([
      {
        name: 'ramda-extended',
        target: '0.3.5'
      },
      {
        name: 'ramda-extended-rsvp',
        target: '0.1.5'
      }
    ])
  }
};
