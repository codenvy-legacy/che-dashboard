[![Contribute](https://rawgit.com/slemeur/4a900bb68300a2643679/raw/1ad2c6d784c92fc21886c765bc6315a1f2ee690c/codenvy-contribute.svg)](http://nightly.codenvy-stg.com/f?id=eba52s80hqnr0snb)


Codenvy User Dashboard V2
==========================




#Requirements

This new version is using gulp as build tool so gulp needs to be installed
```sh
$ npm install --global gulp
```

#Architecture design
Ecmascript6/es6
This new version is using the new feature of Javascript language with a transpiler named babel (previously 6to5)

So application is written with the new language but the resulting build is Javascript v5 compliant

Among new features, Class, arrow functions, etc


## AngularJS recommandation
As classes are available, the controller will be designed as es6 classes.
All injection required will be done through the constructor by adding also the @ngInject annotation.
Also properties are bound with this. scope (so avoid to use $scope in injection as this will be more aligned with AngularJS 2.0 where scope will disappear)
example
```js
/**
 * Defines a controller
 * @author Florent Benoit
 */
class MyCtrl {

  /**
   * Constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor ($http) {
    this.$http = $http; // to use $http in other methods, use this.$http
    this.selectedValue = 'hello';
  }

  exampleMethod() {
    return this.selectedValue;
  }

}

export default CodenvyToggleCtrl;

```

So, no need to add specific arrays for injection.


By using the this syntax, the controllerAs needs to be used when adding the router view
```js
    .when('/myURL', {
      templateUrl: 'mytemplate.html',
      controller: 'MyClassCtrl',
      controllerAs: 'myCtrl'
    })
```

And then, when there is a need to interact with code of a controller, the controllerAs value is used.

```html
 <div>Selected book is {{myCtrl.selectedBook}}</div>
```
Note that as if scope was using, the values are always prefixed



