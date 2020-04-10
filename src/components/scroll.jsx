import React from 'react';

export default React.forwardRef((_props, ref) => (
  <div ref={ref} id="scroll" className="invisible">
    Scroll placeholder
  </div>
));
