/* istanbul ignore file */
/* global window */
const sendTracking = (params) => {
  if (typeof window !== 'undefined' && typeof window.utag !== 'undefined') {
    window.requestIdleCallback?.(() => window.utag?.link(params), {
      timeout: 200,
    });
  }
};

export default function initAnalytics(events) {
  /*
    1. User clicks "Show Comments" query.CoralEmbedStream_Embed.ready
    2. User clicks "Post Comment" mutation.PostComment.success mutation.CreateDontAgree.success
    3. User clicks "Report" mutation.PostFlag.success
    4. User clicks "Ignore" mutation.IgnoreUser.success
    5. User Clicks "Reply" mutation.PostComment.success
    6. User Clicks "Like" mutation.CreateLikeAction.success
  */

  events.on('mutation.IgnoreUser.success', () => {
    const utagParams = {
      event_name: 'comment_user ignore',
      comment_action: 'comment user ignore',
    };
    sendTracking(utagParams);
  });

  events.on('mutation.CreateLikeAction.success', (data) => {
    const action = data.data.createLikeAction || {};
    const errors = action.errors || false;

    if (errors) {
      return;
    }

    const utagParams = {
      event_name: 'comment_like',
      comment_action: 'comment like',
    };
    sendTracking(utagParams);
  });

  events.on('query.CoralEmbedStream_Embed.ready', () => {
    const utagParams = {
      event_name: 'comment_show',
      comment_action: 'comment show',
    };
    sendTracking(utagParams);
  });

  events.on('mutation.CreateDontAgree.success', (data) => {
    const action = data.data.createDontAgree || {};
    const errors = action.errors || false;

    if (errors) {
      return;
    }

    const utagParams = {
      event_name: 'comment_report',
      comment_action: 'comment report',
    };
    sendTracking(utagParams);
  });

  events.on('mutation.PostFlag.success', (data) => {
    const action = data.data.createFlag || {};
    const errors = action.errors || false;

    if (errors) {
      return;
    }

    const utagParams = {
      event_name: 'comment_report',
      comment_action: 'comment report',
    };
    sendTracking(utagParams);
  });

  events.on('mutation.PostComment.success', (data) => {
    const action = data.data.createComment || {};
    const errors = action.errors || false;
    const comment = action.comment || {};
    const hasParent = comment.parent || false;

    if (errors) {
      return;
    }

    let utagParams;

    if (hasParent) {
      utagParams = {
        event_name: 'comment_reply post',
        comment_action: 'comment reply post',
      };
    } else {
      utagParams = {
        event_name: 'comment_post',
        comment_action: 'comment post',
      };
    }
    sendTracking(utagParams);
  });
}
