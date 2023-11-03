
        $(function() {
            var synth = window.speechSynthesis;

            var msg = new SpeechSynthesisUtterance();
            var voices = synth.getVoices();
            msg.voice = voices[0];
            msg.rate = 1;
            msg.pitch = 1;

            $('#chatbot-form-btn').click(function(e) {
                e.preventDefault();
                $('#chatbot-form').submit();
            });
            $('#chatbot-form-btn-clear').click(function(e) {
                e.preventDefault();
                $('#chatPanel').find('.media-list').html('');
            });
            $('#chatbot-form-btn-voice').click(function(e) {
                e.preventDefault();

                var onAnythingSaid = function (text) {
                    console.log('Interim text: ', text);
                };
                var onFinalised = function (text) {
                    console.log('Finalised text: ', text);
                    $('#messageText').val(text);
                };
                var onFinishedListening = function () {
                    // $('#chatbot-form-btn').click();
                };

                try {
                    var listener = new SpeechToText(onAnythingSaid, onFinalised, onFinishedListening);
                    listener.startListening();

                    setTimeout(function () {
                        listener.stopListening();
                        if ($('#messageText').val()) {
                            $('#chatbot-form-btn').click();
                        }
                    }, 5000);
                } catch (error) {
                    console.log(error);
                }
            });

            $('#chatbot-form').submit(function(e) {
                e.preventDefault();
                var message = $('#messageText').val();
                $(".media-list").append('<li class="media"><div class="media-body"><div class="media"><div style = "text-align:right; color : #2EFE2E" class="media-body">' + message + '<hr/></div></div></div></li>');

                $.ajax({
                    type: "POST",
                    url: "/ask",
                    data: $(this).serialize(),
                    success: function(response) {
                        $('#messageText').val('');
                        var answer = response;
                        const chatPanel = document.getElementById("chatPanel");
                        $(".media-list").append('<li class="media"><div class="media-body"><div class="media"><div style = "color : white" class="media-body">' + answer + '<hr/></div></div></div></li>');
                        $(".fixed-panel").stop().animate({ scrollTop: $(".fixed-panel")[0].scrollHeight}, 1000);
                        
                        msg.text = answer;
                        speechSynthesis.speak(msg);
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
            });
        });
