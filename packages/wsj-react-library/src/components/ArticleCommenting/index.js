import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getCoralToken, setCoralScript, getEmbedURL, coralTalkRender, getParameterByName } from './enable-coral'
import CommentCaret from './comment-caret.svg'

const Button = styled.button`
  display: flex;
  width: 100%;
  border: none;
  height: 45px;
  padding: 0 20px;
  border-radius: 2px;
  transition: background-color 125ms ease;
  margin: 0 0 15px;
  text-transform: uppercase;
  color: #fff;
  align-items: center;
  justify-content: center;
  background-color: #0080c3;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background-color: #015483;
  }
  &:focus {
    outline-color: #666;
  }

  & .show-comments {
    display: inline-block;
  }
`

const ShowOrHideCommentsSpan = styled.span`
  ${Button} & {
    font-size: 14px;
    line-height: 18px;
    font-family: var(--font-sans-serif);
  }

  font-weight: 500px;
`

const ContentDiv = styled.div`
  display: ${(props) => (props.isCoralDisplayed ? 'block' : 'none')};
`

const CommentCountSpan = styled.div`
  margin-left: 5px;
`

const CaretSpan = styled.span`
  transform: rotate(-180deg);
  height: 24px;
  width: 24px;
  transition: transform 600ms ease;
  margin-left: 5px;
  transform: ${(props) => (props.isCoralDisplayed ? 'rotate(-180deg)' : 'none')};
`

const ArticleCommenting = ({ id, commentCount, coralCommentsEnabled, shouldCoralLoad, isProd }) => {
  if (!coralCommentsEnabled) return null

  const [toggle, setToggle] = useState(false)
  const [coralRendered, setCoralRendered] = useState(false)
  const [coralAuthRequested, setCoralAuthRequested] = useState(false)
  const [buttonCoralMessage, setButtonCoralMessage] = useState('Show Conversation')

  const embedURL = getEmbedURL(isProd)

  useEffect(() => {
    loadWithSpecificComment()
    window.addEventListener('hashchange', autoLoadCoralModule)
    return () => {
      window.removeEventListener('hashchange', autoLoadCoralModule)
    }
  }, [])

  const setCoralScriptAndLoad = () => {
    setCoralScript(embedURL).then(() => {
      renderModule()
      setToggle(!toggle)
    })
  }

  const autoLoadCoralModule = () => {
    if (window.location.hash && window.location.hash === '#comments_sector') {
      setCoralScriptAndLoad()
    }
  }

  const loadWithSpecificComment = () => {
    const commentId = getParameterByName('commentId')
    if (commentId && commentId !== '') {
      window.location.hash = '#comments_sector'
    }
    autoLoadCoralModule()
  }

  const renderModule = async () => {
    const envPrefix = !isProd ? 's.dev.' : ''
    // When moderator logs in via okta, cookie is dropped as flag to load admin widget
    const oktaSignedIn = document.cookie.indexOf('coral-okta-signed-in=true') !== -1
    const adminPrefix = oktaSignedIn && !envPrefix ? 'admin.' : ''

    let baseURL = `https://${adminPrefix}commenting.${envPrefix}wsj.com`

    // This needs further looking into, wasn't able to properly set up Docker to test comments repo
    // if (window.location.search.indexOf('local_comments=true') !== -1) {
    //   baseURL = 'http://www.local.wsj.com:3000';
    // }

    if (!coralAuthRequested) {
      try {
        setCoralAuthRequested(true)
        await getCoralToken(baseURL, shouldCoralLoad).then((response) => {
          coralTalkRender(response.token, baseURL, id, isProd)
          setCoralRendered(true)
          setButtonCoralMessage('Hide Conversation')
        })
      } catch {
        setToggle(false)
        setButtonCoralMessage('Conversation Temporarily Unavailable')
      }
    }
  }

  const toggleClickHandler = () => {
    if (!coralRendered) {
      setCoralScriptAndLoad()
    }
    if (toggle && coralRendered) {
      setToggle(false)
      setButtonCoralMessage('Show Conversation')
    } else if (!toggle && coralRendered) {
      setToggle(true)
      setButtonCoralMessage('Hide Conversation')
    }
  }

  const showOrHideConversationSpan = toggle ? 'hide' : 'show'

  return (
    <div id="comments_sector" role="region" aria-label="Conversation" tabIndex="-1">
      <Button id={`coral_toggle_${id}`} onClick={toggleClickHandler} data-testid={'coral-toggle-button'}>
        <ShowOrHideCommentsSpan
          id={`show-conversation-span`}
          className={`coral-toggle-text ${showOrHideConversationSpan}-comments`}
        >
          {buttonCoralMessage}
        </ShowOrHideCommentsSpan>
        {commentCount >= 0 ? <CommentCountSpan id={'comment-count-span'}>({commentCount})</CommentCountSpan> : null}
        <CaretSpan isCoralDisplayed={toggle} aria-hidden="true">
          <CommentCaret height={24} width={24} />
        </CaretSpan>
      </Button>
      <ContentDiv id={`coral_content_${id}`} isCoralDisplayed={toggle}>
        <div id={`coral_talk_${id}`}></div>
      </ContentDiv>
    </div>
  )
}

ArticleCommenting.propTypes = {
  /** 
    The Article's SBID
  */
  id: PropTypes.string,
  /**
    Number of comments
  */
  commentCount: PropTypes.number,
  /**
    Determines if the article should have comments enabled 
  */
  coralCommentsEnabled: PropTypes.bool,
  /**
    Checks for environment in order to set up the proper URLs needed
  */
  isProd: PropTypes.bool,
  /**
    Determines whether or not the user should have access to their profile
  */
  shouldCoralLoad: PropTypes.bool,
}

ArticleCommenting.defaultProps = {
  id: '',
  coralCommentsEnabled: false,
  commentCount: 0,
  isProd: false,
  shouldCoralLoad: false,
}

export default ArticleCommenting
