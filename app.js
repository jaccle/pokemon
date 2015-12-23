var app = angular.module('pokeApp', ['ngAnimate']);

app.service('pokemonService', function($http) {
    var crew = [];
    return {
        getPokemon: function(id) {
            id = Math.ceil(Math.random() * 710);
            return $http.get("http://pokeapi.co/api/v1/pokemon/" + id);
        },
        crew: function() {
            return crew;
        },
        getSprite: function(p) {
            return $http.get("http://pokeapi.co" + p.sprites[0].resource_uri);
        },
        lastType: function(p, t) {
            return p.types[t].name;
        },
        pokemon: function(x, m, p) {
            return {
                name: p.name,
                pokeImg: "./images/" + p.types[p.types.length - 1].name + ".png",
                sprite: "http://pokeapi.co" + x.data.image,
                types: p.types,
                lastType: p.types[p.types.length - 1].name,
                moves: m || unknown,
                number: p.pkdx_id,
                bool: true
            };
        }
    };
});


app.controller('PokeController', function($scope, $timeout, $http, pokemonService) {
    $scope.Crew = pokemonService.crew();
    $scope.get1 = function(x, i) {
        pokemonService.getPokemon().then(function(response) {
            var Pokemon = response.data;
            $scope.capitalize = function(str) {
                return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
            };
            pokemonService.getSprite(Pokemon).then(function(res) {
                var types = Pokemon.types.length - 1;
                $scope.types = Pokemon.types;
                function time () {
                    console.log(this);
                    $scope.Crew.splice(x, 1, this);
                    this.bool = true;
                }
                $scope.pokemon = pokemonService.pokemon(res, Pokemon.moves, Pokemon);
                if (x === 'repeat') {
                    console.log($scope.pokemon);
                    $scope.Crew.push($scope.pokemon);
                } else {
                    $scope.pokemon.bool = false;
                    $scope.Crew.splice(x, 1, null);
                    $timeout(time.bind($scope.pokemon), 500);
                }
            });
        });
    };
    $scope.deal = function() {
        for (var i = 0; i < 6; i++) {
            $scope.get1(i);
        }
    };
    for (var i = 0; i < 6; i++) {
        $scope.get1('repeat');
    }
});



app.directive('pickCard', function() {
    return {
        templateUrl: "templates/wild.html"
    };
});
