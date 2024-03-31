const baseUrl = 'https://freeci.ci'
const apiRoutes = {
  'mission.index': baseUrl + '/api/mission',
  'mission.confirmed': baseUrl + '/api/mission-confirmed',
  'mission.changestatut': baseUrl + '/api/mission-changestatut',
  'mission.destroy': baseUrl + '/api/mission',
  'contract.index': baseUrl + '/api/contract',
  'contract.confirmed': baseUrl + '/api/contract-confirmed',
  'contract.changestatut': baseUrl + '/api/contract-changestatut',
  'contract.destroy': baseUrl + '/api/contract',
  'freelancer.destroy.photo': baseUrl + '/api/freelancer-destroy-photo',
  'freelancer.unauthorize': baseUrl + '/api/freelancer-unauthorize',
  'freelancer.cleanup': baseUrl + '/api/freelancer-cleanup',
  'freelancer.confirmed': baseUrl + '/api/freelancer-confirmed',
  'code.store': baseUrl + '/api/code'
}

export { apiRoutes, baseUrl }
