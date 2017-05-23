var defaultVideoPlayerConfiguration = {
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,
    preload: 'auto',
    fluid: false,
    notSupportedMessage: 'This video cannot play on your browser',
    sourceOrder: false
};

var Player = React.createClass({

    getInitialState: function () {
        return {
            someNum: 0
        }
    },

    componentWillUnmount: function () {
        if (this.player) {
            this.player.dispose();
        }
    },

    generateVideoOptions: function (options) {
        var generatedOptions = _.assign({}, defaultVideoPlayerConfiguration, options);

        return generatedOptions;
    },

    componentWillMount: function () {

    },

    increment: function () {
        this.setState({someNum: ++this.state.someNum});

        console.log('CAUSE SET STATE');
    },

    componentDidMount: function () {
        this.player = videojs(document.getElementById('player'), this.generateVideoOptions({}), function () {
            this.player.src({
                src: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Goakultur_und_ihre_Genusskultur_-_Hans_Cousto_-_Psychedelic_Theatre%2C_Kitkat_Club_.webm',
                type: 'video/webm',
            });

            this.player.playbackRate(1);
            console.log('playback rate set');

            this.player.currentTime(0);
            console.log('current time set');

            this.player.volume(0.5);
            console.log('current volume set');

            this.player.muted(false);
            console.log('mute set');

            this.player.on('loadedmetadata', function () {
                this.player.on('waiting')

            }.bind(this));

        }.bind(this));
    },

    render: function () {
        return (
            <div>
                <div className="video-box"
                     dangerouslySetInnerHTML={{
                         __html: '<video class="video-js vjs-big-play-centered" controls id="player" height="720" width="1280"></video>'
                     }}
                />

                <button onClick={this.increment}>{this.state.someNum}</button>
            </div>
        )
    }
});

React.render(<Player />, document.getElementById('main'));

