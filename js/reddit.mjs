export default async function Reddit(doc,storage){

	// Remove potentially sensitive token from hash as soon as possible to prevent potentially leaking it
	const hash = new URLSearchParams(doc.location.hash.replace(/^#/,''))
	if(hash.get("access_token")){
		doc.location.replace("#") //Clear hash
		}

	// Fetch config and validate it
	const configResponse = await fetch('./config.json')
	const config = await configResponse.json()
	console.log(config)
	if(!config || !config.ownDomain && doc.location.origin != `https://${config.ownDomain}`){
		alert(`This code will only run on ${config.ownDomain}. If you have forked this repository, please update your config.json`)
		return
		}

	// OAuth handling
	if(hash.get("access_token")){
		if(hash.get("state") != storage.getItem("latestState")){
			alert('Auth state out of sync. Perhaps you started auth from another window.')
			}
		else{
			storage.setItem("auth",JSON.stringify({
				token: hash.get("access_token"),
				expires: Date.now() + 1000*hash.get("expires_in")
				}))
			}
		}
	const auth = storage.getItem("auth")
	if(!auth || !auth.token || !auth.expires || expires<Date.now() ){
		const state = Math.random().toString(16).slice(2,8)
		storage.setItem("latestState",state)
		const redirectUri = `https://${config.ownDomain}${config.ownPath}`
		const oauthInitUrl = 'https://www.reddit.com/api/v1/authorize?'+ (new URLSearchParams({
			response_type:"token",
			state: state,
			client_id: config.redditAppId,
			scope: config.scope,
			redirect_uri: redirectUri
			}))
		doc.location.assign(oauthInitUrl)
		return
		}

	return auth
	}
