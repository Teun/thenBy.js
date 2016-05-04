suite('Library set up', function () {
    test('firstBy should be in global scope', function (done) {
        if (firstBy) {
            done();
        }
    });
});

suite('Sorting with functions', function () {
	var cityData =  [
            { id: 7, name:  "Amsterdam", population: 750000, country: "Netherlands" },
            { id: 12, name: "The Hague", population: 450000, country: "Netherlands" },
            { id: 43, name: "Rotterdam", population: 600000, country: "Netherlands" },
            { id: 5, name:  "Berlin", population: 3000000, country: "Germany" },
            { id: 42, name: "Düsseldorf", population: 550000, country: "Germany" },
            { id: 44, name: "Stuttgard", population: 600000, country: "Germany" },
        ];

    test('Sort by Country, then by Population', function (done) {
    	var s = firstBy(function (v1, v2) { return v1.country < v2.country ? -1 : (v1.country > v2.country ? 1 : 0); })
                .thenBy(function (v1, v2) { return v1.population - v2.population; });
        cityData.sort(s);
        assert.equal("Amsterdam", cityData[5].name);
        assert.equal("Düsseldorf", cityData[0].name);
        done();
    });
    test('Sort by Country, then by Population, using unary functions', function(done) {
        var s = firstBy(function(v) { return v.country; })
                .thenBy(function(v) { return v.population; });
        cityData.sort(s);
        assert.equal("Amsterdam", cityData[5].name);
        assert.equal("Düsseldorf", cityData[0].name);
        done();
    });
    test('Sort by length of name, then by population, then by ID', function (done) {
        var s = firstBy(function (v1, v2) { return v1.name.length - v2.name.length; })
                 .thenBy(function (v1, v2) { return v1.population - v2.population; })
                 .thenBy(function (v1, v2) { return v1.id - v2.id; });
        cityData.sort(s);
        // shortest name
        assert.equal("Berlin", cityData[0].name);
        // longest name
        assert.equal("Düsseldorf", cityData[5].name);

        // expect Stutgard just after Rotterdam, same name length, same population, higher ID
        assert.equal("Rotterdam", cityData[2].name);
        assert.equal("Stuttgard", cityData[3].name);
        done();
    });
    test('Sort by length of name, then by population, then by ID, using unary functions', function (done) {
        var s = firstBy(function (v) { return v.name.length; })
                 .thenBy(function (v) { return v.population; })
                 .thenBy(function (v) { return v.id; });
        cityData.sort(s);
        // shortest name
        assert.equal("Berlin", cityData[0].name);
        // longest name
        assert.equal("Düsseldorf", cityData[5].name);

        // expect Stutgard just after Rotterdam, same name length, same population, higher ID
        assert.equal("Rotterdam", cityData[2].name);
        assert.equal("Stuttgard", cityData[3].name);
        done();
    });

});
suite('Sorting while managing case sensitivity', function () {
  var cityData =  [
    { id: 2, name:  "Ostrava", population: 750000, country: "czech republic"},
    { id: 4, name: "karvina", population: 450000, country: "Czech Republic"},
    { id: 6, name: "Brno", population: 600000, country: "czech Republic"},
    { id: 8, name:  "prague", population: 3000000, country: "Czech republic"},
  ];

  test('Sort by Name, using unary function', function (done) {
    var s = firstBy(function(v) { return v.name });
    cityData.sort(s);
    assert.equal("Brno", cityData[0].name);
    assert.equal("Ostrava", cityData[1].name);
    assert.equal("karvina", cityData[2].name);
    assert.equal("prague", cityData[3].name);
    done();
  });
  test('Sort by Name, ignoring the case, using unary function', function (done) {
    var s = firstBy(function(v) { return v.name }, {ignoreCase:true, direction:1});
    cityData.sort(s);
    assert.equal("Brno", cityData[0].name);
    assert.equal("karvina", cityData[1].name);
    assert.equal("Ostrava", cityData[2].name);
    assert.equal("prague", cityData[3].name);
    done();
  });
  test('Sort by Country, then by Name ignoring the case, using property name', function (done) {
    var s = firstBy("country")
      .thenBy("name", {ignoreCase:true, direction:1});
    cityData.sort(s);
    assert.equal("karvina", cityData[0].name);
    assert.equal("prague", cityData[1].name);
    assert.equal("Brno", cityData[2].name);
    assert.equal("Ostrava", cityData[3].name);
    done();
  });
  test('Sort by Country ignoring the case using inline .toLowerCase(), then by Name, using function', function (done) {
    var s = firstBy(function (v1, v2) { v1 = v1.country.toLowerCase(); v2 = v2.country.toLowerCase(); return v1 < v2 ? -1 : (v1 > v2 ? 1 : 0); })
      .thenBy("name");
    cityData.sort(s);
    assert.equal("Brno", cityData[0].name);
    assert.equal("Ostrava", cityData[1].name);
    assert.equal("karvina", cityData[2].name);
    assert.equal("prague", cityData[3].name);
    done();
  });
  test('Sort by Country ignoring the case, then by Name ignoring the case, using unary function', function (done) {
    var s = firstBy(function(v) { return v.country }, {ignoreCase:true, direction:1})
      .thenBy(function(v) { return v.name }, {ignoreCase:true, direction:1});
    cityData.sort(s);
    assert.equal("Brno", cityData[0].name);
    assert.equal("karvina", cityData[1].name);
    assert.equal("Ostrava", cityData[2].name);
    assert.equal("prague", cityData[3].name);
    done();
  });
});
suite('Sorting with property names', function () {
	var cityData =  [
            { id: 7, name:  "Amsterdam", population: 750000, country: "Netherlands" },
            { id: 12, name: "The Hague", population: 450000, country: "Netherlands" },
            { id: 43, name: "Rotterdam", population: 600000, country: "Netherlands" },
            { id: 5, name:  "Berlin", population: 3000000, country: "Germany" },
            { id: 42, name: "Düsseldorf", population: 550000, country: "Germany" },
            { id: 44, name: "Stuttgard", population: 600000, country: "Germany" },
        ];

    test('Sort by Country, then by Population', function (done) {
    	var s = firstBy("country")
                .thenBy("population");
        cityData.sort(s);
        assert.equal("Amsterdam", cityData[5].name);
        assert.equal("Düsseldorf", cityData[0].name);
        done();
    });
    test('Sort by Country desc, then by Population', function (done) {
    	var s = firstBy("country", -1)
                .thenBy("population");
        cityData.sort(s);
        assert.equal("Berlin", cityData[5].name);
        assert.equal("The Hague", cityData[0].name);
        done();
    });
    test('Sort by Country, then by Population desc', function (done) {
    	var s = firstBy("country")
                .thenBy("population", -1);
        cityData.sort(s);
        assert.equal("The Hague", cityData[5].name);
        assert.equal("Berlin", cityData[0].name);
        done();
    });
});
suite('Sorting with functions and property names together', function () {
	var cityData =  [
            { id: 7, name:  "Amsterdam", population: 750000, country: "Netherlands" },
            { id: 12, name: "The Hague", population: 450000, country: "Netherlands" },
            { id: 43, name: "Rotterdam", population: 600000, country: "Netherlands" },
            { id: 5, name:  "Berlin", population: 3000000, country: "Germany" },
            { id: 42, name: "Düsseldorf", population: 550000, country: "Germany" },
            { id: 44, name: "Stuttgard", population: 600000, country: "Germany" },
        ];

    test('Sort by name length, then by Population', function (done) {
    	var s = firstBy(function (v1, v2) { return v1.name.length - v2.name.length; })
                .thenBy("population");
        cityData.sort(s);
        assert.equal("Berlin", cityData[0].name);
        assert.equal("Düsseldorf", cityData[5].name);
        done();
    });
    test('Sort by name length using a unary function, then by Population', function (done) {
    	var s = firstBy(function (v) { return v.name.length; })
                .thenBy("population");
        cityData.sort(s);
        assert.equal("Berlin", cityData[0].name);
        assert.equal("Düsseldorf", cityData[5].name);
        done();
    });
    test('Sort by name length desc, then by Population', function (done) {
    	var s = firstBy(function (v1, v2) { return v1.name.length - v2.name.length; }, -1)
                .thenBy("population");
        cityData.sort(s);
        assert.equal("Amsterdam", cityData[4].name);
        assert.equal("The Hague", cityData[1].name);
        done();
    });
    test('Sort by name length desc using a unary function, then by Population', function (done) {
    	var s = firstBy(function (v) { return v.name.length; }, -1)
                .thenBy("population");
        cityData.sort(s);
        assert.equal("Amsterdam", cityData[4].name);
        assert.equal("The Hague", cityData[1].name);
        done();
    });
    test('Sort by name length, then by Population desc', function (done) {
    	var s = firstBy(function (v1, v2) { return v1.name.length - v2.name.length; })
                .thenBy("population", -1);
        cityData.sort(s);
        assert.equal("Amsterdam", cityData[1].name);
        assert.equal("The Hague", cityData[4].name);
        done();
    });
    test('Sort by name length using a unary function, then by Population desc', function (done) {
    	var s = firstBy(function (v) { return v.name.length; })
                .thenBy("population", -1);
        cityData.sort(s);
        assert.equal("Amsterdam", cityData[1].name);
        assert.equal("The Hague", cityData[4].name);
        done();
    });
});
suite('Sorting with property names and undefined properties', function () {
	var cityData =  [
            { id: 7, name:  "Amsterdam", population: 750000, country: "Netherlands" },
            { id: 12, name: "The Hague", population: 450000, country: "Netherlands" },
            { id: 43, name: "Rotterdam", population: 600000 }, // Missing country: Netherlands
            { id: 5, name:  "Berlin", population: 3000000, country: "Germany" },
            { id: 42, name: "Düsseldorf", country: "Germany" }, // Missing population: 550000
            { id: 44, population: 600000, country: "Germany" }, // Missing name: Stuttgard
        ];

    test('Sort by Country, then by Population, missing country comes first', function (done) {
    	var s = firstBy("country")
                .thenBy("population");
        cityData.sort(s);
        assert.equal("Amsterdam", cityData[5].name);
        assert.equal("Rotterdam", cityData[0].name);
        done();
    });
    test('Sort by Country desc, then by Population, missing country comes last', function (done) {
    	var s = firstBy("country", -1)
                .thenBy("population");
        cityData.sort(s);
        assert.equal("Rotterdam", cityData[5].name);
        assert.equal("The Hague", cityData[0].name);
        done();
    });
    test('Sort by Country, then by Population desc', function (done) {
    	var s = firstBy("country")
                .thenBy("population", -1);
        cityData.sort(s);
        assert.equal("The Hague", cityData[5].name);
        assert.equal("Rotterdam", cityData[0].name);
        done();
    });
});
