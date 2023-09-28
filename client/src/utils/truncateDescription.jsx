const useTruncateDescription = (description, wordCount) => {
    // Split the description into words
    const words = description.split(' ');
  
    // If the description has more than the desired word count, truncate it
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(' ') + '...';
    }
  
    // Otherwise, return the original description
    return description;
};

export default useTruncateDescription;