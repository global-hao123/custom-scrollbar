## Transfer to:

http://gitlab.pro/common-ui/custom-scrollbar

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

<iframe src="http://baidu.com" frameborder="0"></iframe>

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>windowSize</th> 
      <td>
<pre>{ width: 1024
, height: 768 }</pre>
      </td>
      <td>The dimensions of the browser window. <em>screenSize</em> is an alias for this property.</td> 
    </tr>
    <tr>
      <th>shotSize</th> 
      <td>
<pre>{ width: 'window'
, height: 'window' }</pre>
      </td>
      <td>The area of the page document, starting at the upper left corner, to render.
      Possible values are 'screen', 'all', and a number defining a pixel length. 
      <br /> <br />
      <strong>'window'</strong> causes the length to be set to the length of the window (i.e. 
      the shot displays what is initially visible within the browser window).
      <br /> <br />
      <strong>'all'</strong> causes the length to be set to the length of the document along
      the given dimension. </td> 
    </tr>
    <tr>
      <th>shotOffset</th>
      <td><pre>{ left: 0
, right: 0
, top: 0
, bottom: 0 }</pre></td>
      <td>The left and top offsets define the upper left corner of the
      screenshot rectangle. The right and bottom offsets allow pixels
      to be removed from the shotSize dimensions (e.g. a shotSize height of
      'all' with a bottom offset of 30 would cause all but the last 30 rows of
      pixels on the site to be rendered).</td>
    </tr>
    <tr>
      <th>phantomPath</th> 
      <td>'phantomjs'</td>
      <td>The location of phantomjs. Webshot tries to use the binary provided by the phantomjs NPM 
      module, and falls back to 'phantomjs' if the module isn't available.</td> 
    </tr>
    <tr>
      <th>phantomConfig</th> 
      <td>{}</td>
      <td>Object with key value pairs corresponding to phantomjs <a href="https://github.com/ariya/phantomjs/wiki/API-Reference#command-line-options">command line options</a>.</td> 
    </tr>
    <tr>
      <th>userAgent</th> 
      <td>undefined</td>
      <td>The <code>user-agent</code> string Phantom sends to the requested page. If left unset, the default
      Phantom <code>user-agent</code> will be used</td> 
    </tr>
    <tr>
      <th>script</th> 
      <td>undefined</td>
      <td>An arbitrary function to be executed on the requested page. The script executes within the page's 
      context and can be used to modify the page before a screenshot is taken. 
      </td> 
    </tr>
    <tr>
      <th>paperSize</th> 
      <td>undefined</td>
      <td>When generating a PDF, sets page.paperSize. Some options are documented here: https://github.com/ariya/phantomjs/pull/15 Example: <code>{format: 'A4', orientation: 'portrait'}</code> 
      </td> 
    </tr>

    <tr>
      <th>streamType</th> 
      <td>'png'</td>
      <td>If streaming is used, this designates the file format of the streamed rendering. Possible values are 
      'png', 'jpg', and 'jpeg'.
      </td> 
    </tr>
    <tr>
      <th>siteType</th> 
      <td>'url'</td>
      <td>siteType indicates whether the content needs to be requested ('url') or is being provided ('html'). Possible values are 
      'url' and 'html'.
      </td> 
    </tr>
    <tr>
      <th>renderDelay</th>
      <td>0</td>
      <td>Number of milliseconds to wait after a page loads before taking the screenshot.
      </td> 
    </tr>
    <tr>
      <th>timeout</th>
      <td>0</td>
      <td>Number of milliseconds to wait before killing the phantomjs process and assuming webshotting has failed.
      (0 is no timeout.)
      </td>
    </tr>
    <tr>
      <th>takeShotOnCallback</th>
      <td>false</td>
      <td>Wait for the web page to signal to webshot when to take the photo using <code>window.callPhantom('takeShot');</code>
      </td> 
    </tr>
  </tbody>
</table>