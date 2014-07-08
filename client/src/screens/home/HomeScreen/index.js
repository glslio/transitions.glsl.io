/** @jsx React.DOM */
var React = require("react");
var BezierEasing = require("bezier-easing");
var NumberInput = require("../../../ui/NumberInput");
var BezierEditor = require("../../../ui/BezierEditor");
var Slideshow = require("../../../ui/Slideshow");
var GLSLio = require("../../../ui/Logo");
var Link = require("../../../ui/Link");
var Fps = require("../../editor/Fps");

var HomeScreen = React.createClass({

  propTypes: {
    env: React.PropTypes.object.isRequired,
    transitions: React.PropTypes.array.isRequired,
    images: React.PropTypes.array.isRequired
  },

  getInitialState: function () {
    return {
      fps: null,
      videoTransition: this.props.transitions[Math.floor(Math.random()*this.props.transitions.length)],
      easing: [0.25, 0.25, 0.75, 0.75],
      duration: 1500
    };
  },

  onSlideChange: function (stats) {
    var fps = stats.frames ? Math.round(1000*stats.frames/stats.elapsedTime) : null;
    if (this.state.fps !== fps) {
      this.setState({ fps: fps });
    }
  },

  onDurationChange: function (i) { // FIXME this should be the int value here...
    this.setState({ duration: parseInt(i.target.value, 10) });
  },

  setEasing: function (easing) {
    this.setState({ easing: easing });
  },

  render: function () {
    return <div className="home-screen">
      <h2>
        WebGL Transitions for your images slideshow
      </h2>
      <p>
        This slideshow shows all transitions created by <GLSLio /> contributors!

        <Slideshow width={512} height={384} images={this.props.images} transitions={this.props.transitions} onSlideChange={this.onSlideChange} transitionEasing={BezierEasing.apply(null, this.state.easing)} transitionDuration={this.state.duration} />
      </p>

      <h3>GLSL Transitions are...</h3>

      <dl>

        <dt><i className="fa fa-tachometer"></i> Highly Performant</dt>
        <dd>
        Incredible Transition Effects running at 60 FPS in your browser.
        </dd>
        <dd>
        The current slideshow transition is running at: <Fps fps={this.state.fps} />
        </dd>
      </dl>

      <dl>
        <dt><i className="fa fa-magic"></i> Incredible Effects</dt>
        <dd>
        GLSL is really <strong>the</strong> ultimate language to implement Transitions in.
        There is really no limitation on effects you can perform with.
        </dd>
        <dd>
        <Link href="/gallery">
          <img src="/assets/examples.png" style={{width: "500px"}} alt="" />
        </Link>
        </dd>
      </dl>

      <dl>
        <dt><i className="fa fa-film"></i> Video Ready!</dt>
        <dd>
          GLSL Transitions focus on defining a transition between 2 sources.
        </dd>
        <dd>
          Those can be images, videos or anything 2D!
          {/* TODO we want this to work without iframe */}
<iframe width={512} height={288} src={"/transition/"+this.state.videoTransition.id+"/embed?video=1"} frameBorder="0" seamless="seamless"></iframe>

        </dd>
      </dl>

      <dl>
        <dt><i className="fa fa-puzzle-piece"></i> Multi-environnment</dt>
        <dd>
          GLSL can be supported both on Browsers and on Native environnment.
          We are working to make GLSL Transitions working in Video Editors.
        </dd>
      </dl>

      <dl>
        <dt><i className="fa fa-cogs"></i> Entirely Customisable</dt>
        <dd>
          A transition exposes "uniform" that is helpful to customize the effect parameters.
          Transition Duration and Transition Easing Function are also customisable.
        </dd>
        <dd className="duration">
        <strong>Duration:</strong>
        <span className="value">{this.state.duration}ms</span>
        <NumberInput onChange={this.onDurationChange} type="range" step={50} min={100} max={3000} value={this.state.duration} />
        </dd>
        <dd>
        <strong>Easing:</strong>
        <BezierEditor value={this.state.easing} onChange={this.setEasing} width={500} height={300} handleRadius={8} padding={[20, 100, 20, 100]} />
        </dd>
      </dl>

      <dl>
        <dt><i className="fa fa-cloud-download"></i> Easy to use</dt>
        <dd>
          The <Link href="https://github.com/glslio/glsl-transition">glsl-transition</Link> library make GLSL Transitions very easy to use on your webpages.
        </dd>

      </dl>

      <h3>
        <GLSLio /> is...
      </h3>

      <dl>
        <dt><i className="fa fa-users"></i> Community Driven</dt>
        <dd>
          GLSL Transitions are created by people, for people.
        </dd>
      </dl>

      <dl>
        <dt><i className="fa fa-code"></i> Free License Transitions</dt>
        <dd>
        All transitions are released under Free License.
        By creating content on <GLSLio />, you accept to release transitions under MIT License.
        </dd>
      </dl>

      <dl>
        <dt><i className="fa fa-code"></i> Entirely Open Source</dt>
        <dd>
        The source code of <GLSLio /> itself is fully available <Link href="https://github.com/">on Github</Link>.
        </dd>
      </dl>

      <dl>
        <dt><i className="fa fa-github-alt"></i> Gist Hosted</dt>
        <dd>
          No data are kept on our server.
          All transitions are stored in Gists and owned by the community.
        </dd>
      </dl>

      <br style={{"clear":"both"}} />
    </div>;
  }

});

module.exports = HomeScreen;

