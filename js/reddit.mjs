export default async function reddit(){
	const configResponse = await fetch('./config.json')
	const config = await configResponse.json()
	console.log(config)
	if(config.verifyOwnDomain && document.location.origin == `https://${config.verifyOwnDomain}`){
		alert('ok')
		}
	else {
		alert(`This code will only run on ${config.verifyOwnDomain}. If you have forked this repository, please update your config.json`)
		}
	}
