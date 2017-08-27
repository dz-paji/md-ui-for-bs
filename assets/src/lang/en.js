export default {
  auth: {
    emptyIdentification: 'Empty email/player name.',
    emptyPassword: 'Password is required.',
    emptyCaptcha: 'Empty password.',
    login: {
      title: 'Log In',
      button: 'Log In',
      message: 'Log in to manage your skin & players',
      keep: 'Remember me',
      success: 'Logged in successfully~'
    },
    loggingIn: 'Logging In',
    tooManyFails: 'You fails too many times! Please enter the CAPTCHA.',
    emptyEmail: 'Empty email address.',
    invalidEmail: 'Invalid format of email address.',
    invalidPassword:
      'Invalid password. The length of password should between 8 and 16.',
    emptyConfirmPwd: 'Empty confirming password.',
    invalidConfirmPwd: 'Confirming password is not equal with password.',
    emptyNickname: 'Empty nickname.',
    register: {
      title: 'Register',
      button: 'Register',
      message: 'Welcome to :sitename!',
      nicknameIntro: 'Whatever you like expect special characters',
      repeatPwd: 'Repeat your password',
      close: "Well, this site doesn't allow any register.",
      success: 'Registered successfully. Redirecting...',
      max: "You can't register more than :regs accounts.",
      registered: 'The email address is already registered.'
    },
    registering: 'Registering',
    send: 'Send',
    sending: 'Sending',
    reset: {
      title: 'Reset Password',
      button: 'Reset',
      invalid: 'Invalid link.',
      expired: 'This link is expired.',
      message: ':username, reset your email address here.',
      success: 'Password resetted successfully.'
    },
    resetting: 'Resetting',
    check: {
      anonymous: 'Illegal access. Please log in first.',
      admin: 'Only admins are permitted to access this page.',
      banned: 'You are banned on this site. Please contact the admin.',
      token: 'Invalid token. Please log in.'
    },
    forgot: {
      title: 'Forgot Password',
      button: 'Send',
      message: 'We will send you an E-mail to verify.',
      loginLink: 'I do remember it',
      close: 'Password resetting is not available now.',
      frequentMail:
        'You click the send button too fast. Wait for 60 secs, guy.',
      unregistered: 'The email address is not registered.'
    },
    mail: {
      title: 'Reset your password on :sitename',
      success: 'Mail is sent. Will be expired in 1 hour, please check.',
      failed: 'Fail to send mail, detailed message :msg',
      message:
        'You are receiving this email because this email address was used to reset your password on :sitename',
      ignore:
        "If you haven't signed up on our site, please ignore this email. No unsubscribing is required.",
      reset: 'Reset your password',
      notice:
        'This mail is sending automatically, no reponses will be sent if you reply.'
    },
    bind: {
      title: 'Bind Email',
      button: 'Bind',
      message: 'You need to fill your email adderss to continue.',
      introduction:
        "Email addresses will be used for password resetting. We won't send you any spam.",
      registered: 'The email address is already registered.'
    },
    validation: {
      identification: 'Invalid format of email or player name.',
      email: 'Email format is invalid.',
      captcha: 'Wrong CAPTCHA.',
      user: 'Unexistent user.',
      password: 'Wrong email or password.'
    },
    logout: { success: 'Logged out successfully~', fail: 'No valid session.' },
    nickname: 'Nickname',
    email: 'Email',
    identification: 'Email or player name',
    password: 'Password',
    captcha: 'Please enter the CAPTCHA.',
    changeCaptcha: 'Click to change CAPTCHA image.',
    loginLink: 'Already registered? Log in here.',
    forgotLink: 'Forgot password?',
    registerLink: 'Register a new account'
  },
  skinlib: {
    addToCloset: 'Add to closet',
    removeFromCloset: 'Remove from closet',
    setItemName: 'Set a name for this texture',
    emptyItemName: 'Empty texture name.',
    setNewTextureName: 'Please enter the new texture name:',
    emptyNewTextureName: 'Empty new texture name.',
    filter: {
      nowShowing: 'Now showing',
      skin: 'Skin',
      cape: 'Cape',
      anyModel: '(Any Model)',
      steveModel: '(Steve Model)',
      alexModel: '(Alex Model)',
      uploader: 'User (:name) Uploaded',
      cleanFilter: 'Clean Filter'
    },
    sort: { newestUploaded: 'Newestly Uploaded', mostLikes: 'Most Likes' },
    emptyTextureName: 'Empty texture name.',
    emptyTextureType: 'Please select a type for this texture.',
    emptyUploadFile: 'You have not uploaded any file.',
    encodingError: 'Error: Encoding of this file is not accepted.',
    fileExtError: 'Error: Textures should be PNG files.',
    upload: {
      title: 'Upload Texture',
      textureName: 'Texture Name',
      nameRule: 'Less than 32 characters and must not contain any special one.',
      textureType: 'Texture Type',
      selectFile: 'Select File',
      privateScoreNotice:
        'It will spend you more scores to set it as private. You will be charged :score scores for every KB storage.',
      privacyNotice: 'Prevent it from being visible at skin library.',
      setAsPrivate: 'Make it Private',
      button: 'Upload',
      typeError: 'Incorrect mime type of uploaded file.',
      invalidSize: 'Invalid :type file (Width :width, Height :height)',
      invalidHdSkin:
        'Invalid HD skin (Width and height can not be devided by 32)',
      lackScore: "You don't have enough score to upload this texture.",
      repeated:
        'The texture is already uploaded by someone else. You can add it to your closet directly.',
      success: 'Texture :name was uploaded successfully.'
    },
    uploading: 'Uploading',
    redirecting: 'Redirecting...',
    setAsPrivate: 'Set as Private',
    setAsPublic: 'Set as Public',
    setPublicNotice: 'Sure to set this as public texture?',
    deleteNotice: 'Are you sure to delete this texture?',
    general: {
      filter: 'Filter',
      myUpload: 'Uploaded by Me',
      sort: 'Sort',
      searchTextures: 'Search For Textures',
      uploadNewSkin: 'Upload New Skin',
      noResult: 'No result.'
    },
    item: {
      steve: '(Steve)',
      alex: '(Alex)',
      cape: '(Cape)',
      removeFromCloset: 'Remove from closet',
      addToCloset: 'Add to closet',
      anonymous: 'Please login first',
      private: 'Private'
    },
    show: {
      title: 'Texture Details',
      anonymous: 'You must login to use closets',
      likes: 'People who like this',
      detail: 'Details',
      name: 'Texture Name',
      editName: 'Edit Name',
      model: 'Applicable Model',
      downloadRaw: 'Click to download raw texture',
      size: 'File Size',
      uploader: 'Uploader',
      uploadAt: 'Upload At',
      managePanel: 'Manage Panel',
      deleteTexture: 'Delete Texture',
      notice:
        'The texture which was deleted or setted to private will be removed from the closet of everyone who had favorited it.',
      noticeAdmin:
        'You are able to delete this texture or make it private. The operations will make it removed from the closet of everyone who had favorited it.',
      comment: 'Comment',
      commentNotAvailable: 'Comment is not available.',
      deleted: 'The requested texture was already deleted.',
      contactAdmin: 'Please contact the admins to remove this entry.',
      private:
        'The requested texture is private and only visible to the uploader and admins.'
    },
    delete: { success: 'The texture was deleted successfully.' },
    privacy: {
      changePrivacy: 'Change Privacy',
      setAsPrivate: 'Set as Private',
      setAsPublic: 'Set as Public',
      success: 'The texture was setted to :privacy successfully.'
    },
    rename: { success: 'The texture was renamed to :name successfully.' },
    noPermission: "You aren't the uploader of this texture.",
    nonExistent: 'Non-existent texture.'
  },
  user: {
    signRemainingTime: 'Available after :time :unit',
    timeUnitHour: 'h',
    timeUnitMin: 'min',
    emptyClosetMsg:
      '<p>Nothing in your closet...</p><p>Why not explore the <a href=":url">Skin Library</a> for a while?</p>',
    renameItem: 'Rename item',
    removeItem: 'Remove from closet',
    setAsAvatar: 'Set as avatar',
    viewInSkinlib: 'View in skin library',
    switch2dPreview: 'Switch to 2D Preview',
    switch3dPreview: 'Switch to 3D Preview',
    removeFromClosetNotice: 'Sure to remove this texture from your closet?',
    emptySelectedPlayer: 'No player is selected.',
    emptySelectedTexture: 'No texture is selected.',
    renameClosetItem: 'Set a new name for this item:',
    changePlayerName: 'Please enter the player name:',
    emptyPlayerName: 'Empty player name.',
    clearTexture: 'Sure to clear the skins & cape of this player?',
    deletePlayer: 'Sure to delete this player?',
    deletePlayerNotice: "It's permanent. No backups.",
    chooseClearTexture: 'Choose texture types you want to clear',
    noClearChoice: "You haven't choose any types",
    setAvatar: 'Sure to set this as your avatar?',
    setAvatarNotice: 'The head segment of skin will bu used.',
    emptyNewNickName: 'Empty new nickname.',
    changeNickName: 'Sure to set your nickname to :newNickname?',
    emptyPassword: 'Original password is required.',
    emptyNewPassword: 'Empty new password.',
    emptyNewEmail: 'Empty new email address.',
    changeEmail: 'Sure to change your email address to :newEmail?',
    emptyDeletePassword: 'Please enter the current password:',
    used: {
      title: 'Resources Used',
      players: 'Registered players',
      storage: 'Storage used'
    },
    curScore: 'Current Score',
    scoreNotice: 'Click the score to show introduction.',
    sign: 'Sign',
    signSuccess: 'Signed successfully. You got :score scores.',
    cantSignUntil: "You can't sign in in :time :unit",
    lastSign: 'Last signed at :time',
    signRemainTime: 'Available after :time :unit',
    announcement: 'Announcement',
    scoreIntro: {
      title: 'What is score?',
      introduction:
        'We use score system to prevent the behaviors like uplaoding huge amount of textures and registering players casually.\nBoth adding players and uplaoding textures will consume your score. :returnScore\n\nThe inital score of user on this site is :initialScore, you can acquire :scoreFrom ~ :scoreTo scores by signing in.\n',
      willReturnScore: 'The score will be returned if you deleted them.',
      noReturnScore: 'But the score will NOT be returned if you deleted them.',
      rates: {
        storage: ':score scores = 1 KB storage',
        player: ':score scores = 1 player'
      }
    },
    closet: {
      upload: 'Upload Texture',
      search: 'Search Texture',
      typeToSearch: 'Type to search',
      switchCategory: 'Switch Category',
      view: 'View in skin library',
      more: 'More',
      setAvatar: 'Set as avatar',
      useAs: {
        button: 'Apply...',
        title: 'Which player should be applied to?',
        empty: 'It seems that you own no player...',
        add: 'Add new player'
      },
      add: {
        success: 'Added :name to closet successfully~',
        repeated: 'You have already added this texture.',
        lackScore: "You don't have enough score to add it to closet."
      },
      rename: {
        title: 'Rename item',
        success: 'The item is successfully renamed to :name'
      },
      remove: {
        title: 'Remove from closet',
        success: 'Texture was removed from closet successfully.',
        nonExistent: 'The texture does not exist in your closet.'
      }
    },
    player: {
      playerName: 'Player Name',
      edit: 'Edit',
      operation: 'Delete',
      editPname: 'Player name',
      deleteTexture: 'Textures',
      deletePlayer: 'Player',
      addPlayer: 'Add new player',
      loginNotice:
        'Now you can log in with player names you owned instead email address.',
      playerInfo:
        'Information (click player name to show preview)',
      textures: {
        steve: 'Steve Model：',
        alex: 'Alex Model：',
        cape: 'Cape：',
        empty: 'Nothing'
      },
      pnameRule: 'Could only contain letters, numbers and dashes.',
      pnameRuleChinese:
        'Could only contain chinese characters, letters, numbers and dashes.',
      add: {
        repeated: 'The player name is already registered.',
        lackScore: "You don't have enough score to add a player.",
        success: 'Player :name was added successfully.'
      },
      delete: { success: 'Player :name was deleted successfully.' },
      rename: {
        repeated: 'This player name is occupied. Please choose another one.',
        success: 'Player :old was renamed to :new'
      },
      set: { success: 'The texture was applied to player :name successfully.' },
      clear: {
        success: 'The textures of player :name was resetted successfully.'
      },
      preference: {
        title: 'Preference',
        success: 'The preference of player :name was updated to :preference'
      }
    },
    profile: {
      avatar: {
        title: 'Change Avatar?',
        notice:
          'Click the gear icon of any skin in your skinlib, then click 「Set as avatar」. We will cut the head segment of that skin for you. If there is no icon like this, please unable the extensions like ADBlock.',
        wrongType: "You can't set a cape as avatar",
        nonExistent: 'Non-existent texture',
        success: 'Avatar setted successfully'
      },
      password: {
        title: 'Change Password',
        old: 'Old Password',
        new: 'New Password',
        confirm: 'Repeat Password',
        button: 'Change Password',
        wrongPassword: 'Original password is not correct.',
        success: 'Password updated successfully, please log in again.'
      },
      nickname: {
        title: 'Change Nickname',
        empty: 'No nickname is setted now.',
        rule: 'Whatever you like expect special characters',
        success: 'Nickname is successfully updated to :nickname'
      },
      email: {
        title: 'Change Email',
        new: 'New Email',
        password: 'Current Password',
        button: 'Change Email',
        wrongPassword: 'Wrong password.',
        existed: 'This email address is used.',
        success: 'Email address updated successfully, please log in again.'
      },
      delete: {
        title: 'Delete Account',
        notice: 'Sure to delete your account on :site?',
        admin: 'Admin account can not be deleted.',
        button: 'Delete My Account',
        modalTitle: 'You need to enter your password to continue',
        modalNotice:
          "You're about to delete your account.\nThis is permanent! No backups, no restores, no magic undo button.\nWe warned you, ok?\n",
        password: 'Current Password',
        wrongPassword: 'Wrong password.',
        success: 'Your account is deleted successfully.'
      }
    }
  },
  admin: {
    operationsTitle: 'Operations',
    ban: 'Ban',
    unban: 'Unban',
    setAdmin: 'Set as admin',
    unsetAdmin: 'Remove admin',
    deleteUser: 'Delete User',
    cannotDeleteAdmin: "You can't delete admins.",
    cannotDeleteSuperAdmin: "You can't delete super admin in this way",
    changeEmail: 'Edit Email',
    changeNickName: 'Edit Nickname',
    changePassword: 'Edit Password',
    newUserEmail: 'Please enter the new email:',
    newUserNickname: 'Please enter the new nickname:',
    newUserPassword: 'Please enter the new password:',
    deleteUserNotice: "Are you sure to delete this user? It' permanent.",
    scoreTip: 'Press ENTER to submit new score',
    doubleClickToSeeUser: 'Double click to see info of this user',
    doubleClickToSeePlayers: 'Double click to see his/her players',
    banned: 'Banned',
    normal: 'Normal',
    admin: 'Admin',
    superAdmin: 'Super Admin',
    textureType: 'Texture Type',
    skin: 'Skin (:model Model)',
    cape: 'Cape',
    pid: 'Texture ID',
    pidNotice:
      'Please enter the tid of texture. Inputting 0 can clear texture of this player.',
    changePlayerTexture: 'Change textures of :player',
    changeTexture: 'Change Textures',
    changePlayerName: 'Change Player Name',
    changeOwner: 'Change Owner',
    deletePlayer: 'Delete',
    changePlayerOwner:
      'Please enter the id of user which this player should be transferred to:',
    deletePlayerNotice: "Are you sure to delete this player? It' permanent.",
    targetUser: 'Target user is :nickname',
    noSuchUser: 'No such user',
    changePlayerNameNotice: 'Please input new player name:',
    emptyPlayerName: 'Player name cannot be empty.',
    textureUploads: 'Texture Uploads',
    userRegistration: 'User Registration',
    configurePlugin: 'Configure',
    noPluginConfigNotice:
      'The plugin has been disabled or no configuration is provided.',
    deletePlugin: 'Delete',
    statusEnabled: 'Enabled',
    statusDisabled: 'Disabled',
    enablePlugin: 'Enable',
    disablePlugin: 'Disable',
    confirmDeletion: 'Are you sure to delete this plugin?',
    preparing: 'Preparing',
    downloadCompleted: 'Update package download completed.',
    extracting: 'Extracting update package..',
    index: {
      totalUsers: 'Registered Users',
      totalPlayers: 'Players',
      totalTextures: 'Uploaded Textures',
      diskUsage: 'Disk Usage',
      overview: 'Overview'
    },
    users: {
      playersCount: { title: 'Players Count' },
      status: {
        title: 'Status',
        normal: 'Normal',
        banned: 'Banned',
        admin: 'Admin',
        superAdmin: 'Super Admin'
      },
      operations: {
        title: 'Operations',
        nonExistent: 'No such user.',
        noPermission: 'You have no permission to operate this user.',
        email: {
          change: 'Edit Email',
          existed: ':email is existed.',
          success: 'Email changed successfully.'
        },
        nickname: {
          change: 'Edit Nickname',
          success: 'Nickname changed successfully.'
        },
        password: {
          change: 'Edit Password',
          success: 'Password changed successfully.'
        },
        score: { success: 'Score changed successfully.' },
        admin: {
          set: {
            text: 'Set as Admin',
            success: 'The account has been set as admin.'
          },
          unset: {
            text: 'Remove Admin',
            success: "The account's admin privilege has been removed."
          }
        },
        ban: {
          ban: { text: 'Ban', success: 'The account has been banned.' },
          unban: { text: 'Unban', success: 'The account has been unbanned.' },
          cantSuperAdmin: "You can't ban super admin.",
          cantAdmin: 'Only super admins are able to ban admins.'
        },
        delete: {
          delete: 'Delete User',
          success: 'The account has been deleted successfully.',
          cantSuperAdmin: "You can't delete super admin in this way",
          cantAdmin: "You can't delete admins."
        }
      }
    },
    players: {
      noPermission: 'You have no permission to operate this player.',
      operations: { title: 'Operations' },
      preference: {
        success:
          'The preference of player [:player] has been changed to :preference'
      },
      textures: {
        change: 'Change Textures',
        nonExistent: 'No such texture tid.:tid',
        success: 'The textures of :player has been updated.'
      },
      name: { success: 'Player name has been updated to :player' },
      owner: {
        change: 'Change Owner',
        success: 'The player :player was transferred to user :user.'
      },
      delete: {
        delete: 'Delete',
        success: 'The player has been deleted successfully.'
      }
    },
    customize: {
      changeColor: {
        title: 'Change theme color',
        success: 'Theme color updated.'
      },
      colors: {
        blue: 'Blue (Default)',
        blueLight: 'Blue Light',
        yellow: 'Yellow',
        yellowLight: 'Yellow Light',
        green: 'Green',
        greenLight: 'Green Light',
        purple: 'Purple',
        purpleLight: 'Purple Light',
        red: 'Red',
        redLight: 'Red Light',
        black: 'Black',
        blackLight: 'Black Light'
      }
    },
    plugins: {
      name: 'Name',
      description: 'Description',
      author: 'Author',
      version: 'Version',
      status: { title: 'Status', enabled: 'Enabled', disabled: 'Disabled' },
      operations: {
        title: 'Operations',
        enabled: ':plugin has been enabled.',
        disabled: ':plugin has been disabled.',
        deleted: 'The plugin was deleted successfully.',
        noConfigNotice:
          "The plugin is not installed or doesn't provide configuration page."
      },
      empty: 'No result'
    },
    update: {
      complete: 'Update completed',
      info: {
        title: 'Update Information',
        upToDate: 'Already up-to-date.',
        available: 'New version available.',
        preReleaseWarning:
          'This update is a pre-release, please double check before updating.',
        versions: { latest: 'Latest Version:', current: 'Current Version:' },
        releaseTime: 'Release Time:',
        preRelease: 'You are now using pre-release version.',
        changeLog: { text: 'Change Log:', empty: 'Empty' },
        downloads: {
          text: 'Download Link:',
          link: 'Click to download full program package.'
        },
        checkGithub:
          '<a href=":url" target="_blank" class="btn btn-default pull-right">Check GitHub Releases</a>',
        button: 'Update Now'
      },
      cautions: {
        title: 'Cautions',
        text:
          'Please choose update source according to your host location.\nLow-speed connection between update source and your host will cause long-time loading at checking/downloading page.\n'
      },
      download: {
        downloading: 'Downloading update package...',
        size: 'Size of package:',
        errors: null,
        prefix: 'An error occured: ',
        connection: 'Unable to access to current update source. Details:',
        writePermission:
          'Unable to make cache directory. Please sure permission.',
        unzip: 'Failed to unzip update file. Error code: ',
        overwrite: 'Unable to overwrite files.'
      }
    },
    options: {
      optionSaved: 'Option Saved.',
      homepage: {
        title: 'Homepage',
        homePicUrl: {
          title: 'Picture URL at Homepage',
          hint:
            'Path relative to homepage or full URL, leave empty to use default image'
        },
        faviconUrl: {
          title: 'Website Icon',
          hint: 'Path relative to resources/assets/ or full URL.',
          description:
            'The given image must have same width and height (leave blank to use default icon).'
        },
        copyrightPrefer: {
          title: 'Program Copyright',
          description:
            'Any evil modification applied on the footer program copyright (including deleting, modifying author, changing link target) with out permission is <b>FORBIDDEN</b>. The author reserves the right to pursue relevant responsibilities.'
        },
        copyrightText: {
          title: 'Custom Copyright Text',
          description:
            'Placeholders are available in custom copyright text. e.g. <code>{site_name}</code> & <code>{site_url}</code>'
        }
      },
      customJsCss: {
        title: 'Custom CSS/JavaScript',
        message:
          'The contents will be attached to &lt;style&gt; and &lt;script&gt; tags.<br>\n- Here are some useful examples: <a href="https://github.com/printempw/blessing-skin-server/wiki/Examples-of-custom-CSS-JavaScript">Examples of Custom CSS JavaScript @GitHub WiKi</a>\n',
        customCss: 'CSS',
        customJs: 'JavaScript'
      },
      rate: {
        title: 'About Scores',
        scorePerStorage: { title: 'Storage', addon: 'scores = 1 KB' },
        privateScorePerStorage: {
          title: 'Private Storage',
          addon: 'scores = 1 KB',
          hint: 'Uploading private textures will cost more scores.'
        },
        scorePerClosetItem: {
          title: 'Favorites',
          addon: 'score = 1 closet item'
        },
        returnScore: {
          title: 'Score Return',
          label:
            'Return scores back to user after deleting players/textures/closet items.'
        },
        scorePerPlayer: { title: 'Players', addon: 'scores = 1 player' },
        userInitialScore: 'User Initial Score'
      },
      sign: {
        title: 'Signing',
        signScore: {
          title: 'Score Granted',
          addon1: 'scores ~',
          addon2: 'scores'
        },
        signGapTime: { title: 'Gap Time', addon: 'hours' },
        signAfterZero: {
          title: 'Time',
          label: 'Users can sign in after 0 everyday.',
          hint: 'The above option will be ignored if this is checked.'
        }
      },
      general: {
        title: 'General Options',
        siteName: 'Site Name',
        siteDescription: 'Site Description',
        siteUrl: {
          title: 'Site URL',
          hint: 'Begin with http(s)://, nerver ends with slash'
        },
        userCanRegister: {
          title: 'Open Registration',
          label: 'Everyone is allowed to register.'
        },
        regsPerIp: 'Max accounts of one IP',
        ipGetMethod: {
          title: 'Get IP via',
          httpXForwardedFor: 'HTTP_X_FORWARDED_FOR (can be fabricated)',
          remoteAddr: "REMOTE_ADDR (isn't suit for sites under load balancer)",
          hint:
            'We have no method to get the real IP address of client with PHP.'
        },
        maxUploadFileSize: {
          title: 'Max Upload Size',
          hint: 'Limit of PHP in php.ini: :size'
        },
        allowChinesePlayername: {
          title: 'Player Name',
          label: 'Allow chinese player names.'
        },
        apiType: 'Prefered JSON API',
        autoDelInvalidTexture: {
          title: 'Invalid Textures',
          label: 'Delete invalid textures automatically.',
          hint:
            'Delete textures records whose file no longer exists from skinlib.'
        },
        commentScript: {
          title: 'Comment Script',
          description:
            'Placeholders are available in comment scripts. <code>{tid}</code> will be replaced with texture id, <code>{name}</code> will be replaced with texture name, <code>{url}</code> will be replaced with current URL.'
        },
        allowSendingStatistics: {
          title: 'Statistics',
          label: 'Send usage statistics anonymously.',
          hint: 'Information about privacy will nerver be sent.'
        }
      },
      announ: {
        title: 'Announcement',
        announcement: { description: 'Styling with Markdown is supported.' }
      },
      resources: {
        title: 'Resource Files',
        hint: 'Please adjust these options when CDN cache is on',
        forceSsl: {
          title: 'Force SSL',
          label: 'Use HTTPS protocol to load resources forcely.',
          hint: 'Check SSL available before turning on'
        },
        autoDetectAssetUrl: {
          title: 'Assets URL',
          label: 'Determine assets url automatically.',
          description:
            "Load asset files according to current URL. The site url will be used if this is not enabled. Please unable this if requests don't go through CDN."
        },
        return200WhenNotfound: {
          title: 'HTTP Response Code',
          label:
            'Return 200 instead of 404 when requesting un-existent player.',
          description:
            "If your CDN doesn't cache 404 pages, please turn this on. A flood of requests to un-existent players will greatly slow down the site."
        },
        cacheExpireTime: {
          title: 'Cache Exipre Time',
          hint: 'In seconds, 86400 = one day, 31536000 = one year'
        }
      },
      update: {
        title: 'Check Update',
        checkUpdate: {
          title: 'Check Update',
          label: 'Check update automatically and notify me.'
        },
        updateSource: {
          title: 'Update Source',
          description:
            'Available update source list can be found at: <a href="https://github.com/printempw/blessing-skin-server/wiki/%E6%9B%B4%E6%96%B0%E6%BA%90%E5%88%97%E8%A1%A8">@GitHub Wiki</a>'
        }
      }
    }
  },
  general: {
    skin: 'Skin',
    cape: 'Cape',
    fatalError: 'Fatal Error (Please contact the author)',
    confirmLogout: 'Sure to log out?',
    confirm: 'OK',
    cancel: 'Cancel',
    more: 'More',
    pagination: 'Page :page, total :total',
    searchResult: '(Search result of keyword ":keyword")',
    noResult: 'No result.',
    index: 'Homepage',
    skinlib: 'Skin Library',
    userCenter: 'User Center',
    logout: 'Log Out',
    login: 'Log In',
    register: 'Register Now',
    profile: 'User Profile',
    adminPanel: 'Admin Panel',
    explore: 'Explore',
    manage: 'Manage',
    anonymous: 'Guest',
    back: 'Back',
    dashboard: 'Dashboard',
    myCloset: 'Closet',
    playerManage: 'Players',
    userManage: 'Users',
    pluginManage: 'Plugins',
    pluginMarket: 'Plugin Market',
    pluginInstalled: 'Installed Plugins',
    customize: 'Customize',
    options: 'Options',
    importV2: 'Import Data',
    scoreOptions: 'Score Options',
    checkUpdate: 'Check Update',
    downloadUpdate: 'Download Updates',
    close: 'Close',
    loading: 'Loading',
    texturePreview: 'Texture Preview',
    walk: 'Walk',
    fastWalk: 'Fast Walk',
    run: 'Run',
    expandArms: 'Expand Arms',
    rotation: 'Rotation',
    prevBackground: 'Last Background',
    nextBackground: 'Next Background',
    submit: 'Submit',
    notice: 'Notice',
    switch2DPreview: 'Switch to 2D Preview',
    illegalParameters: 'Illegal parameters.',
    private: 'Private',
    public: 'Public',
    unexistentUser: 'Un-existent user',
    unexistentPlayer: 'Un-existent player.',
    textureDeleted: 'The requested texture has been deleted.',
    textureNotUploaded:
      'The user haven not uploaded the texture of :type model yet.',
    operations: 'Operations',
    user: {
      uid: 'UID',
      email: 'Email',
      nickname: 'Nickname',
      password: 'Password',
      score: 'Score',
      registerAt: 'Registered At'
    },
    player: {
      pid: 'PID',
      owner: 'Owner',
      playerName: 'Player Name',
      preference: 'Preference',
      previews: 'Texture Previews',
      lastModified: 'Last Modified'
    }
  }
}
