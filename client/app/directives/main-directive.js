angular.module('Techtalk')
  .factory('socket', function ($rootScope, config) {
    if (typeof (io) != "undefined") {
      var socket = io.connect(config.Urls.URLService, { reconnection: false });
      return {
        on: function (eventName, callback) {
          socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        },
        emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              if (callback) {
                callback.apply(socket, args);
              }
            });
          })
        }
      };
    }
    return;
  })
  .directive('serverError', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        element.on('keydown', function () {
          ctrl.$setValidity('server', true)
        });
      }
    }
  })
  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });

          var $id = $("." + attrs.ngScrollBottomText);
          $id.scrollTop($id[0].scrollHeight + 250);
          event.preventDefault();
        }
      });
    };
  })
  .directive("ngScrollBottom", function () {
    return {
      link: function (scope, element, attr) {
        var $id = $("." + attr.ngScrollBottom);
        $(element).on("click", function () {
          $id.scrollTop($id[0].scrollHeight + 250);
          $('.msg-field').focus();
        });
      }
    }
  });
