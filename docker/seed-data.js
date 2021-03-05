db.templates.insertMany([{
  userId: '1234567890', name: 'My first template', type: 'masu', savedate: '01/03/2021', data: {
    pageFormat: 'A4',
    length: '105', width: '105', height: '20',
    withDesign: true,
    withLid: false,
    base: {
      key: 'base',
      background: '#8ED1FC',
      backgroundImage: null,
      texts: {},
      images: {},
    },
  }
}]);
