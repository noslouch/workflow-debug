/* global Coral */
import wretch from 'wretch'

export const getCoralToken = async (baseURL, canComment) => {
  if (canComment) {
    const response = await wretch(`${baseURL}/api/v1/auth/dj/token`)
      .options({
        credentials: 'include',
      })
      .get()
      .res()

    if (!response.ok) {
      return { token: null }
    }
    return response.json()
  } else {
    return { token: null }
  }
}

export const getEmbedURL = () => {
  // This needs further looking into, wasn't able to properly set up Docker to test comments repo
  // if (LOCAL_CORAL_TALK === 'true')
  // return 'http://www.local.wsj.com:3000/static/embed.js';
  // TODO: revisit when a solution for components that need env. info. is agreed upon.
  const environmentSubdomain = process.env.NODE_APP !== 'production' ? 's.dev.' : ''
  return `https://commenting.${environmentSubdomain}wsj.com/static/embed.js`
}

export const setCoralScript = (url) => {
  return new Promise((resolve, reject) => {
    // check first if Coral has been set
    if (!window.Coral) {
      const embedCoralScript = document.createElement('script')
      embedCoralScript.type = 'text/javascript'
      embedCoralScript.src = url
      embedCoralScript.onload = () => resolve()
      embedCoralScript.onerror = reject
      document.body.appendChild(embedCoralScript)
    } else {
      resolve()
    }
  })
}

const sendTracking = (params) => {
  if (typeof window !== 'undefined' && typeof window.utag !== 'undefined') {
    window.requestIdleCallback?.(() => window.utag?.link(params), { timeout: 200 })
  }
}

export const coralTalkRender = (token, url, ref, id) => {
  const node = ref.current

  Coral.Talk.render(node, {
    talk: url,
    auth_token: token,
    events: function events(_events) {
      /*
        1. User clicks "Show Comments" query.CoralEmbedStream_Embed.ready
        2. User clicks "Post Comment" mutation.PostComment.success mutation.CreateDontAgree.success
        3. User clicks "Report" mutation.PostFlag.success
        4. User clicks "Ignore" mutation.IgnoreUser.success
        5. User Clicks "Reply" mutation.PostComment.success
        6. User Clicks "Like" mutation.CreateLikeAction.success
      */

      _events.on('action.SHOW_SIGNIN_DIALOG', () => {
        // TODO: revisit when a solution for components that need env. info. is agreed upon.
        const envPrefix = process.env.NODE_APP !== 'production' ? '' : 'int.'
        location.href =
          `https://${envPrefix}accounts.wsj.com/login?target=` +
          encodeURIComponent(`${location.href}#coral_toggle_${id}`)
      })

      _events.on('mutation.IgnoreUser.success', () => {
        const utagParams = {
          event_name: 'comment_user ignore',
          comment_action: 'comment user ignore',
        }
        sendTracking(utagParams)
      })

      _events.on('mutation.CreateLikeAction.success', (data) => {
        const action = data.data.createLikeAction || {}
        const errors = action.errors || false

        if (errors) {
          return
        }

        const utagParams = {
          event_name: 'comment_like',
          comment_action: 'comment like',
        }
        sendTracking(utagParams)
      })

      _events.on('query.CoralEmbedStream_Embed.ready', () => {
        const utagParams = {
          event_name: 'comment_show',
          comment_action: 'comment show',
        }
        sendTracking(utagParams)
      })

      _events.on('mutation.CreateDontAgree.success', (data) => {
        const action = data.data.createDontAgree || {}
        const errors = action.errors || false

        if (errors) {
          return
        }

        const utagParams = {
          event_name: 'comment_report',
          comment_action: 'comment report',
        }
        sendTracking(utagParams)
      })

      _events.on('mutation.PostFlag.success', (data) => {
        const action = data.data.createFlag || {}
        const errors = action.errors || false

        if (errors) {
          return
        }

        const utagParams = {
          event_name: 'comment_report',
          comment_action: 'comment report',
        }
        sendTracking(utagParams)
      })

      _events.on('mutation.PostComment.success', (data) => {
        const action = data.data.createComment || {}
        const errors = action.errors || false
        const comment = action.comment || {}
        const hasParent = comment.parent || false

        if (errors) {
          return
        }

        let utagParams

        if (hasParent) {
          utagParams = {
            event_name: 'comment_reply post',
            comment_action: 'comment reply post',
          }
        } else {
          utagParams = {
            event_name: 'comment_post',
            comment_action: 'comment post',
          }
        }
        sendTracking(utagParams)
      })
    },
  })
}

// used to get value of commentId
export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href
  const params = new URL(url).searchParams
  return params.get(name)
}
