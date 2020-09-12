(function(io, $) {
    const socket = io($URL_ROOT);
    const alertBlock = $('#alerts');
    const messages = $('#messages');
    const msgForm = $('#msg-form');
    
    msgForm.on('submit', handleMsgForm);
    function handleMsgForm(event) {
        event.preventDefault();
        const msgText = document.getElementById('msg-text').value;
        socket.emit('message-sent', {data: msgText});
        return false;
    }

    socket.on('response', function(msg) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = msg.data;
        messages.append(messageElement);
    });

    socket.on('user-connected', function(msg) {
        const alert = $('<div class="alert alert-info"></div>');
        alert.text(msg.data);
        alert.hide();
        alertBlock.append(alert);
        alert.fadeIn();

        setTimeout(() => {
            $('.alert').each(function(index) {
                $(this).fadeOut(400, function() {
                    $(this).remove();
                });
            });
        }, 3000);
    });

    
    
    
})(io, jQuery);