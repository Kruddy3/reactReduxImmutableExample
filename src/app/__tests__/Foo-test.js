import React from 'react';
import { shallow, mount, render } from 'enzyme';

import TodoList from '../TodoLists';

let hello = {
  "params":{
    "topicId":"testingUrl"
  }
};
describe('A suite', function() {

  it('shallow render searching that navbar is selectable and renders', function() {
    expect(shallow(<TodoList />).find('.NAVBAR').length).toBe(1);
  });
  it('check color of the items when loaded', function(){
    expect(mount(<TodoList match={hello} />).find('.unselected').length).toBe(2);
    // .find('.unselected')).toHaveStyle('color', 0  );
  })
  // it('should render without throwing an error', function() {
  //   expect(shallow(<Foo />).contains(<div className="foo">Bar</div>)).toBe(true);
  // });
  //
  // it('should be selectable by class "foo"', function() {
  //   expect(shallow(<Foo />).is('.foo')).toBe(true);
  // });

  // it('should mount in a full DOM', function() {
  //   expect(mount(<Foo />).find('.foo').length).toBe(1);
  // });
  //
  // it('should render to static HTML', function() {
  //   expect(render(<Foo />).text()).toEqual('Bar');
  // });
});
