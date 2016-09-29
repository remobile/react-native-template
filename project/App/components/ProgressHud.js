'use strict';

var React = require('react');
var ReactNative = require('react-native');
var tweenState = require('react-tween-state');

var {
    Image,
    StyleSheet,
    TouchableHighlight,
    View,
} = ReactNative;

var BACKGROUND_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjBFOTY2OTRGMDlBMTFFNUFGQUVDMUUwNDA5REUwMzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjBFOTY2OTVGMDlBMTFFNUFGQUVDMUUwNDA5REUwMzQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MEU5NjY5MkYwOUExMUU1QUZBRUMxRTA0MDlERTAzNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MEU5NjY5M0YwOUExMUU1QUZBRUMxRTA0MDlERTAzNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrUpG+0AAATlSURBVHjazJpLjBVVEIa7+zYzlwGG4WF0RhkJj4EEY3yigiyU3STiYjbCRmQFC1gQEkIISzUxonHpRqOGBQnxsTImhFcIMYIhZKLyUgENyjPD8JCBud1WOX/r8aROnb7PvpV8uTOdvn3P31V1Tp3qDtM0DRpkITD/T8Fd4iZxhThHnCK+J/YTvzfkx+sUwoMtgexCqUDiOM78ROwmdhEXWi0kIiYZAnwkOc6pEF8Q7xDDzRbCHugk4pwCqhFinsve2YFQbLgQ9sBkJXy0ASc1fGeE2ER8mTdE8tgUYirOD4XEdiW8ZqmRV9LxbuJjYifRUa8QHtR0ouwZeCgc94mQBi8JW4tQm1JraGUi4irjPzGOJbjW2/BoP7GYmKt81/U73xFDxF/VCGERPciLvCLGQeK4s6b1EYPEa8Qy6zqamEPEauJ+XiHTkdh5RPBFx4y7X609Q2wnVuYU8wmxNY8QFjBDWOASYd6/I92dGu0V4n1ilifk2DYQX2lCeIF7EJOAzws36/CCy3qJT4knPd65QbxMXHLNWj1I7tBBBBGjTRDB9gfxKrHPE2LTEI7i9NuBE0KFcYhIg+YZh+vrxDFPjnIoPiYJmSHcfZMAq20zRWTGU+w6lCiJQDaGjbaQGPO8KcD2xggSvFX2J2YnV64myJNHTCHdlgDbG2OuhajJ9jXyRfPKkC3EDCk7vG4Exdm7ggBzIhg09xVlS4TpjXvwSFE2jPJE8gh/PkrMiVCMRQ5CrBdF2+fW4G2WxljJQ2OPHVoV6u02EHLIyovUqpwXRQgrl0eyQrBo4xnsvMMb/4SXKSQUZq77QfvYWSE/sr/7YqsksTc77STkglEW2YvytBizVt6dXJF2R9nrlGPPdjdqIyGpUlkkMVTGjhNKbSSkU6m4b8dQOcnRMJjcRkJ6MVZpnKMxVu4uofsR+joXLbY5hkfscf4Wo/yIHCd0waVjBYuYDY+4hJxnAbeEhbBkfM5qA288h7CqQEzFWhBPZ5VtpNDbBkJWKqs6c9zca7i8MhNlflE2QCwxBm17gxfKi1luXHaU8Nmzj4EChawxwqoilPL7zQXvkrEASnCL6KECRLxAPK2EVAW7yH+FcGhd8+TKEygwW2Uc0usFL5gcQWX8vxLkF48QXhyfb9Fqz1P+FjRENG/skmqpUTTItJYQz+fLlZKmUSI2E/OVpgNzAKW9WBSehFKto9KH6bCrCSK4t7YNjbdE2afz9vsj84tSE/th4lnBM1JT4tugjiexlnG/941g4kmA1DswuzvvEYd9QgIk9jzhIlLuXAwmnplfqVEAd0FWEY97miDZ517iQ/siLiH8pReD/zrzmphs4eQp/Azxa46GRTcWuaXEQqsk0kT8SLwl9RG0R2980ZeQ4JpHpPqM67friOVxHO/ElMolzwPGYusSYIv5mXjTVcD6Hk/z7LQCCe4TUxI+S8KAS45zNRE/EB8EE6+C1LSV5bt5ENOcnXAugkB/TJ0G+usedrOae787NRF5PGLaXKwhZcUz0h0uKcc1b3C18RlxNM/gqn2Fo4y9wUCOEIs8ArTk5l7vnmratbW+VMObraeIBcod1QbsEnCC+Cao4dWnel9z4kd1i8HsnF6yucobI4TQ9VoHEjbwxTMW1Y/plT3Wg6KvbPSR72JHeg13nafUkUb8+N8CDABdKT+Sgc4IvgAAAABJRU5ErkJggg==";

var SPIN_DURATION = 1000;

var ProgressHudMixin = {
    getInitialState() {
        return {
            is_hud_visible: false
        };
    },

    showProgressHud() {
        this.setState({
            is_hud_visible: true
        });
    },

    dismissProgressHud() {
        this.setState({
            is_hud_visible: false
        });
    },

    childContextTypes: {
        showProgressHud: React.PropTypes.func,
        dismissProgressHud: React.PropTypes.func
    },

    getChildContext() {
        return {
            showProgressHud: this.showProgressHud,
            dismissProgressHud: this.dismissProgressHud
        };
    },
};

var ProgressHud = React.createClass({
    mixins: [tweenState.Mixin],

    contextTypes: {
        showProgressHud: React.PropTypes.func.isRequired,
        dismissProgressHud: React.PropTypes.func
    },

    statics: {
        Mixin: ProgressHudMixin
    },

    propTypes: {
        isDismissible: React.PropTypes.bool,
        isVisible: React.PropTypes.bool.isRequired,
        color: React.PropTypes.string,
        overlayColor: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            isDismissible: false,
            color: '#000',
            overlayColor: 'rgba(0, 0, 0, 0)'
        };
    },

    getInitialState() {
        return {
            rotate_deg: 0
        };
    },

    componentDidMount() {
        // Kick off rotation animation
        this._rotateSpinner();

        // Set rotation interval
        this.interval = setInterval(() => {
            this._rotateSpinner();
        }, SPIN_DURATION);
    },

    componentWillUnmount() {
        clearInterval(this.interval);
    },

    _rotateSpinner() {
        this.tweenState('rotate_deg', {
            easing: tweenState.easingTypes.linear,
            duration: SPIN_DURATION,
            endValue: this.state.rotate_deg === 0 ? 360 : this.state.rotate_deg + 360
        });
    },

    _clickHandler() {
        if (this.props.isDismissible) {
            this.context.dismissProgressHud();
        }
    },

    render() {
        // Return early if not visible
        if (!this.props.isVisible) {
            return <View />;
        }

        // Set rotation property value
        var deg = Math.floor(
            this.getTweeningValue('rotate_deg')
        ).toString() + 'deg';

        return (
            /*jshint ignore:start */
            <TouchableHighlight
                key="ProgressHud"
                style={[styles.overlay, {
                    backgroundColor: this.props.overlayColor
                }]}
                onPress={this._clickHandler}
                underlayColor={this.props.overlayColor}
                activeOpacity={1}
                >
                <View
                    style={[styles.container, {
                        left: this.getTweeningValue('left')
                    }]}
                    >
                    <Image
                        style={[styles.spinner, {
                            backgroundColor: this.props.color,
                            transform: [
                                {rotate: deg}
                            ]
                        }]}
                        source={{
                            uri: BACKGROUND_IMAGE,
                            isStatic: true
                        }}
                        >
                        <View style={styles.inner_spinner}>
                        </View>
                    </Image>
                    <Image
                        resizeMode='cover'
                        source={app.img.splash_logo}
                        style={styles.inner_spinner_image}>
                    </Image>
                </View>
            </TouchableHighlight>
            /*jshint ignore:end */
        );
    }
});


var styles = StyleSheet.create({
    overlay: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 16,
    },
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 60 / 2
    },
    inner_spinner: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#5F5F5F'
    },
    inner_spinner_image: {
        position: 'absolute',
        left: 26,
        top: 26,
        width: 48,
        height: 48,
        borderRadius: 48/2,
    },
});

module.exports = ProgressHud;
