import Reddit from './js/reddit.mjs'
import script from './js/script.mjs'

main()

async function main(){
	const reddit = await Reddit(document,sessionStorage)
	script(reddit)
	}
