module.exports = {
  description: '',
  normalizeEntityName () {},

  afterInstall () {
    return this.addBowerPackagesToProject([
      {
        name: 'ramda-extended',
        target: '0.3.1'
      },
      {
        name: 'ramda-extended-rsvp',
        target: '0.1.1'
      }
    ])
  }
};