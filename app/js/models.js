(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.Page = (function() {

    function Page(index, title, description, type) {
      this.index = index;
      this.title = title;
      this.description = description;
      this.type = type != null ? type : 'simple';
    }

    return Page;

  })();

  this.QuestionPage = (function(_super) {

    __extends(QuestionPage, _super);

    function QuestionPage(question, index) {
      this.question = question;
      QuestionPage.__super__.constructor.call(this, index, this.question.title, this.question.description, "question-" + this.question.type);
    }

    return QuestionPage;

  })(Page);

  this.IntroPage = (function(_super) {

    __extends(IntroPage, _super);

    function IntroPage() {
      IntroPage.__super__.constructor.apply(this, arguments);
    }

    return IntroPage;

  })(Page);

  this.ResponsePage = (function(_super) {

    __extends(ResponsePage, _super);

    function ResponsePage(questionPages, index, title, description) {
      this.questionPages = questionPages;
      ResponsePage.__super__.constructor.call(this, index, title, description, 'response');
    }

    return ResponsePage;

  })(Page);

}).call(this);
