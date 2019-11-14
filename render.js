//import User from "sorter.js";
class User {
  constructor() {
    this.movielist = "https://casecomp.konnectrv.io/movie";
    this.apmov = "https://casecomp.konnectrv.io/movie?platfor";
    this.hbomov = "https://casecomp.konnectrv.io/movie?platform=hbo";
    this.netmov = "https://casecomp.konnectrv.io/movie?platform=netflix";
    this.showlist = "https://casecomp.konnectrv.io/show";
    this.movprod = "https://casecomp.konnectrv.io/production/movie";
    this.showprod = "https://casecomp.konnectrv.io/production/show";
    this.showplat = "https://casecomp.konnectrv.io/platform/movie";
    this.movplat = "https://casecomp.konnectrv.io/platform/show";
    this.prodpref = [];
    this.langpref = ["en"];
    this.rating = [0, 0];
    this.year = [0, 0];
    this.updatePreferences();
  }
  updateGenre(obj) {
    if (bool) {
      this.genreselect.push(obj);
      updatePreferences();
    }
  }

  resetFilters() {
    this.prodpref = [];
    this.langpref = ["en"];
    this.rating = [0, 0];
    this.year[(0, 0)];
    this.updatePreferences();
  }
  changeRating(lo, hi) {
    this.rating[0] = lo;
    this.rating[1] = hi;
    this.updatePreferences();
  }
  changeYear(lo, hi) {
    this.year[0] = lo;
    this.year[1] = hi;
    this.updatePreferences();
  }

  updateProductionCompany(obj) {
    this.prodpref.push(obj);
    this.updatePreferences();
  }

  updateLanguage(obj) {
    this.langpref.push(obj);
    this.updatePreferences();
  }

  stats(type) {
    //checking the production company
    let url;
    if (type == 1) {
      url = this.netmov;
    } else if (type == 2) {
      url = this.apmov;
    } else if (type == 3) {
      url = this.hbomov;
    }
    //getting the http request using the
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    let movieobj = JSON.parse(xmlHttp.responseText);
    let list = movieobj;
    //console.log(Object.keys(list).length);

    // if (this.prodpref.length > 0 && Object.keys(list).length > 0) {
    //   list = movieobj.filter(a => this.checkprodcomp(a));
    // }

    //console.log(Object.keys(list).length);
    console.log(this.rating);
    //console.log(parseInt(this.year[0], 10));
    console.log(Object.keys(list).length);

    if (Object.keys(list).length > 0) {
      list = list.filter(
        a => this.year[0] < a.release_date.split("-")[0],
        10 < this.year[1]
      );
    }
    //console.log(Object.keys(list).length);

    //console.log(Object.keys(list).length);
    //console.log(Object.keys(list).length);
    if (Object.keys(list).length > 0) {
      list = list.filter(
        a => this.rating[0] <= a.vote_average <= this.rating[1]
      );
    }
    console.log(Object.keys(list).length);

    let count = Object.keys(list).length;
    let avgrat = 0;
    if (!count == 0) {
      let avgrat = 3000 / count;
    } else {
      avgrat = 0;
    }

    return {
      list: list,
      count: count,
      avgrating: avgrat
    };
  }
  checklang(obj) {
    for (let i = 0; i < this.langpref.length; i++) {
      if (this.langpref[i] == obj.original_language) {
        return true;
      }
    }
    return false;
  }
  checkprodcomp(obj) {
    let count = Object.keys(obj.production_companies).length;
    console.log(count);
    for (let i = 0; i < this.prodpref.length; i++) {
      for (let j = 0; j < count; j++) {
        if (obj.production_companies[j] == this.prodpref[i]) {
          return true;
        }
      }
    }
    return false;
  }

  getStats() {
    this.updatePreferences();
    return this.preferencestats;
  }

  updatePreferences() {
    this.preferencestats = {
      netflix: {
        list: this.stats(1).list,
        count: this.stats(1).count,
        avgrating: this.stats(1).rating
      },
      prime: {
        list: this.stats(2).list,
        count: this.stats(2).count,
        avgrating: this.stats(2).rating
      },
      hbo: {
        list: this.stats(3).list,
        count: this.stats(3).count,
        avgrating: this.stats(3).rating
      }
    };
  }
}

var user = new User();
//user.updateLanguage("en");
//user.changeRating(0, 10);
//user.changeYear(0, 2020);
//user.updateProductionCompany("Pad Thai Pictures");
//user.updateProductionCompany("Warner Bros. Pictures");
//user.updateProductionCompany("Universal Pictures");

const loadNetflixStats = function() {
  const $netflix = $("#netflix");
  let i = user.getStats().netflix.count;
  if (i > 5) {
    i = 5;
  }
  let ret = "";
  for (let j = 0; j < i; j++) {
    $(netflix).append(
      `<p><span> ${user.getStats().netflix.list[j].title}</span></p>`
    );
  }
  return (
    `<div class = ""  id = "netflixcard">
    <p><span> ${user.getStats().netflix.count}  matched your search</span></p>
    <br/>
    <a href="https://www.netflix.com/signup/planform"><button class = "button" name = "submit" type="button">More Information</button>
    </a></div>` + ret
  );
};

const loadnetTitles = function() {
  let i = user.getStats().netflix.count;
  if (i > 5) {
    i = 5;
  }
  let ret = "";
  for (let j = 0; j < i; j++) {
    $(netflix).append(
      `<p><span> ${user.getStats().netflix.list[1].title}</span></p>`
    );
  }
  return ret;
};

const loadhboTitles = function() {
  let i = user.getStats().hbo.count;
  if (i > 5) {
    i = 5;
  }
  let ret = "";
  for (let j = 0; j < i; j++) {
    ret + `<p><span> ${user.getStats().hbo.list[j].title}</span></p>`;
  }
  return ret;
};

const loadprimetTitles = function() {
  let i = user.getStats().prime.count;
  if (i > 5) {
    i = 5;
  }
  let ret = "";
  for (let j = 0; j < i; j++) {
    ret + `<p><span> ${user.getStats().prime.list[j].title}</span></p>`;
  }
  return ret;
};

const loadHBOStats = function() {
  let i = user.getStats().hbo.count;
  if (i > 5) {
    i = 5;
  }
  let ret = "";
  for (let j = 0; j < i; j++) {
    $(hbo).append(`<p><span> ${user.getStats().hbo.list[j].title}</span></p>`);
  }
  const $hbo = $("#hbo");
  return (
    `<div class = ""  id = "hbocard">
    <p><span> ${user.getStats().hbo.count}  matched your search</span></p>
    <br />
    <a href="https://subscribe.hbonow.com/?origin=orderTrial"><button class = "submit button" name = "submit" type="button">More Information</button>
    </a></div>` + ret
  );
};
const loadPrimeStats = function() {
  const $prime = $("#prime");

  let i = user.getStats().prime.count;
  if (i > 5) {
    i = 5;
  }
  let ret = "";
  for (let j = 0; j < i; j++) {
    $(prime).append(
      `<p><span> ${user.getStats().prime.list[j].title}</span></p>`
    );
  }
  return (
    `<div class = ""  id = "primecard">
    <p><span> ${user.getStats().prime.count}  matched your search</span></p>
    <br />
    <a href="https://www.amazon.com/gp/video/offers/ref=dvm_us_dl_sl_bi_brw|c_13727457773_m_tqKSdolx-dc_/137-6902058-1210449"><button class = "submit button" name = "submit" type="button">More Information</button>
    </a></div>` + ret
  );
};

const eventHandler = function() {
  const $root = $("#root");
  const $netflix = $("#netflix");
  const $hbo = $("#hbo");
  const $prime = $("#prime");
  $netflix.append(loadNetflixStats());
  $netflix.append(loadnetTitles());
  $hbo.append(loadHBOStats());
  $hbo.append(loadhboTitles());
  $prime.append(loadPrimeStats());
  $prime.append(loadprimetTitles());
  $("#find").on("click", submitFunction);
  $("#reset").on("click", resetFunction);
};

const handleprodcompchange = function(event) {
  let prodcomp = $("#production_box").val();
  user.updateProductionCompany(prodcomp);
  let netflixcard = event.currentTarget.closest("#netflixcard");
  let primecard = event.currentTarget.closest("#primecard");
  let hbocard = event.currentTarget.closest("#hbocard");
  var netnew = loadNetflixStats();
  var primenew = loadPrimeStats();
  var hbonew = loadHBOStats();
  $(netflixcard).replaceWith(netnew);
  $(primecard).replaceWith(primenew);
  $(hbocard).replaceWith(hbonew);
};

const handleyearchange = function(event) {
  let hi = $("#upper_year").val();
  let lo = $("#lower_year").val();
  user.changeYear(parseFloat(lo), parseFloat(hi));

  let netflixcard = $("#netflixcard");
  let primecard = $("#primecard");
  let hbocard = $("#hbocard");
  let netnew = loadNetflixStats();
  let primenew = loadPrimeStats();
  let hbonew = loadHBOStats();
  $(netflixcard).replaceWith(netnew);
  $(primecard).replaceWith(primenew);
  $(hbocard).replaceWith(hbonew);
};

const handleratingchange = function(event) {
  let hi = $("#upper_rating").val();
  let lo = $("#lower_rating").val();
  user.changeRating(parseFloat(lo), parseFloat(hi));
  let netflixcard = $("#netflixcard");
  let primecard = $("#primecard");
  let hbocard = $("#hbocard");
  let netnew = loadNetflixStats();
  let primenew = loadPrimeStats();
  let hbonew = loadHBOStats();
  $(netflixcard).replaceWith(netnew);
  $(primecard).replaceWith(primenew);
  $(hbocard).replaceWith(hbonew);
};

$(function() {
  eventHandler();
});

const submitFunction = function(event) {
  event.preventDefault();
  // handleprodcompchange(event);
  handleyearchange(event);
  handleratingchange(event);
};

const resetFunction = function(event) {
  event.preventDefault();
  user.resetFilters();
};
