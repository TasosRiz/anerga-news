/*
|--------------------------------------------------------------------------
| SelectFilter
|--------------------------------------------------------------------------
|
| Reusable dropdown filter component.
|
| Το χρησιμοποιούμε όταν θέλουμε να φιλτράρουμε μία λίστα με βάση
| μία επιλεγμένη τιμή.
|
| Παραδείγματα χρήσης:
| - Posts ανά κατηγορία
| - Posts ανά status
| - Reports ανά status
| - Users ανά role
| - Active / inactive records
|
| Το component είναι controlled από το parent.
| Δηλαδή το SelectFilter δεν κρατά δικό του state.
|
| Το parent δίνει:
| - value: την τρέχουσα επιλεγμένη τιμή
| - onChange: function που ενημερώνει το state του parent
| - options: τις επιλογές του dropdown
| - placeholder: το default option, π.χ. "Όλες οι κατηγορίες"
|
| Παράδειγμα:
|
| const [selectedCategoryId, setSelectedCategoryId] = useState("");
|
| const categoryOptions = categories.map((category) => ({
|     value: String(category.id),
|     label: category.name,
| }));
|
| const filteredPosts = selectedCategoryId
|     ? posts.filter((post) => String(post.category_id) === selectedCategoryId)
|     : posts;
|
| <SelectFilter
|     label="Κατηγορία"
|     value={selectedCategoryId}
|     onChange={setSelectedCategoryId}
|     placeholder="Όλες οι κατηγορίες"
|     options={categoryOptions}
| />
|
| Μετά περνάμε τη φιλτραρισμένη λίστα στο table:
|
| <PostsTable posts={filteredPosts} />
|
|--------------------------------------------------------------------------
*/