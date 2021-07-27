export default async function Reddit(doc,storage){

	// Remove potentially sensitive token from hash as soon as possible to prevent potentially leaking it
	const hash = new URLSearchParams(doc.location.hash.replace(/^#/,''))
	const hashToken = hash.get("token")
	if(hashToken){
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
	if(hashToken){
		storage.setItem("token",token)
		}
	const token = hashToken || storage.getItem("token")
	if(!token){
		const redirectUri = `https://${config.ownDomain}${config.ownPath}`
		const oauthInitUrl = 'https://www.reddit.com/api/v1/authorize?'+ (new URLSearchParams({
			response_type:"token",
			state:"0",
			client_id: config.redditAppId,
			scope: config.scope,
			redirect_uri: redirectUri
			}))
		doc.location.push(oauthInitUrl)
		return
		}

	return token
	}
