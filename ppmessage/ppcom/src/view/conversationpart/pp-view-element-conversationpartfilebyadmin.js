((function(View) {

    var classAvatar = 'pp-conversation-part-msg-by-admin-avatar';

    /**
     * @constructor
     */
    function PPConversationPartFileByAdmin(item) {
        View.PPDiv.call(this, 'pp-conversation-part-file-by-admin');

        var userAvatar = item.user.avatar,
            userName = item.user.name,
            userId = item.user.id,
            fileUrl = item.message.file.fileUrl,
            fileName = item.message.file.fileName,
            messageId = item.messageId,

            // 当用户信息(通常：头像或姓名)改变的时候，回调
            onAdminUserInfoChangeEvent = function(topics, user) {

                var selector = '#pp-conversation-part-' + messageId,
                    userInfo = user.getInfo();

                // Change user avatar src
                $(selector)
                    .find('.' + classAvatar)
                    .attr('src', userInfo.user_avatar);
                
            };

        // subscribe 'user/infochange/xxxx-xxx-xxxx(user_uuid)' event
        Service.$pubsub.subscribe("user/infochange/" + userId, onAdminUserInfoChangeEvent);

        this.add(new View.PPDiv('pp-conversation-part-file-by-admin-outer')
                 .add(new View.PPDiv('pp-conversation-part-file-by-admin-outer-2')
                      .add(View.conversationPartTools.buildAvatars( item.user.avatar, Service.$conversationManager.activeConversation().token ))
                      .add(new View.PPDiv('pp-conversation-part-msg-by-admin-body-container')
                           .add(new View.PPDiv('pp-conversation-part-file-by-admin-outer-4')
                                .add(new View.PPDiv('pp-conversation-part-file-by-admin-outer-5')
                                     .add(new View.PPDiv({
                                         id: 'pp-conversation-part-file-by-admin-upload-icon',
                                         style: 'background-image:url(' + Configuration.assets_path + 'img/icon-attachment.png)'
                                     }))
                                     .add(new View.PPDiv('pp-conversation-part-file-by-admin-outer-6')
                                          .add(new View.PPElement('a', {
                                              href: fileUrl,
                                              download: fileName,
                                              'class': "pp-conversation-part-file-by-admin-file-link pp-font",
                                              title: fileName
                                          })
                                               .text(fileName
                                                    ))))
                                .add(new View.PPDiv('pp-conversation-part-file-by-admin-timestamp-container')
                                     .add(new View.PPElement('span', {
                                         'class': 'pp-selectable pp-font',
                                         id: 'pp-conversation-part-file-by-admin-timestamp-' + messageId
                                     })
                                          .text()))))));
    }
    extend(PPConversationPartFileByAdmin, View.PPDiv);

    View.PPConversationPartFileByAdmin = PPConversationPartFileByAdmin;
    
})(View));
