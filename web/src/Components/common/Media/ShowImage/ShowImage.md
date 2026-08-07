ShowImage
- κοινό component που κατασκευάζει το URL
  και χειρίζεται placeholder / variant

ReportImage
- εξειδικευμένο component για report φωτογραφίες



## Παράδειγμα χρήσης

```jsx
import ShowImage from "../../common/Media/ShowImage/ShowImage";

const ExampleComponent = ({ post }) => {
  return (
    <ShowImage
      src={post.photo}
      alt={post.title}
      type="media"
      variant="card"
      showPlaceholder
    />
  );
};

export default ExampleComponent;

