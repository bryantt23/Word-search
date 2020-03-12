module.exports = class FeedbackApp {
  getFormattedDate = dateString => {
    let dateObject = new Date(dateString);
    let month = dateObject.getUTCMonth() + 1;
    let date = dateObject.getDate();
    let year = dateObject.getFullYear();
    return ` (${month}/${date}/${year})`;
  };

  getStarRating = (rating = 0) => {
    let starString = "";
    if (rating === 0) return starString;

    let starValue = rating / 20;

    if (starValue % 1 >= 0.5) {
      starString += "½";
    }
    starValue = Math.floor(starValue);

    while (starValue > 0) {
      starString = "★" + starString;
      starValue--;
    }

    return " " + starString;
  };

  formatFeedback(feedback) {
    let word = feedback["word"],
      comment = feedback["comment"],
      starRating = this.getStarRating(feedback["rating"]),
      date = this.getFormattedDate(feedback["date"]);

    const maxLineLength = 80;
    let resultString = `${word}: ${comment}${starRating}${date}`;
    if (resultString.length <= maxLineLength) {
      return resultString;
    }

    let stringWithoutDate = `${word}: ${comment}${starRating}`;
    if (stringWithoutDate.length <= maxLineLength) {
      return stringWithoutDate;
    }

    let extraSpace = 5; // colon and space after word, ... after comment
    let commentLength =
      maxLineLength - word.length - starRating.length - extraSpace;

    return `${word}: ${comment.substring(0, commentLength)}...${starRating}`;
  }
};
