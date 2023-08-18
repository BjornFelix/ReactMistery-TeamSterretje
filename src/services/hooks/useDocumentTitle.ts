import { useEffect, useState } from 'react';

const useDocumentTitle = (title: string, restore = false) => {
  const [originalTitle] = useState(document.title);

  useEffect(() => {
    document.title = title;
    return () => {
      if (restore) {
        document.title = originalTitle;
      }
    };
  }, [restore, title, originalTitle]);
};

export default useDocumentTitle;
