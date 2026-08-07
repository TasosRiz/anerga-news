import 'package:service_management_mobile/components/Dashboard/Section_title.dart';
import 'package:flutter/material.dart';

// Categories
import 'package:service_management_mobile/components/Categories/model/category_model.dart';
import 'package:service_management_mobile/components/Categories/model/categories_api.dart';

class ServiceCategories extends StatefulWidget {
  final String title;

  const ServiceCategories({super.key, required this.title});

  @override
  State<ServiceCategories> createState() => _ServiceCategoriesState();
}

class _ServiceCategoriesState extends State<ServiceCategories> {
  late Future<List<CategoryModel>> categoriesFuture;

  @override
  void initState() {
    super.initState();
    categoriesFuture = CategoriesApi.fetchCategories();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionTitle(title: widget.title),
        const SizedBox(height: 16),
        //Category
        FutureBuilder<List<CategoryModel>>(
          future: categoriesFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Padding(
                padding: EdgeInsets.all(20),
                child: CircularProgressIndicator(),
              );
            }

            if (snapshot.hasError) {
              return Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  snapshot.error.toString().replaceFirst('Exception: ', ''),
                  style: const TextStyle(color: Colors.red),
                ),
              );
            }

            final categories = snapshot.data ?? [];

            if (categories.isEmpty) {
              return const Padding(
                padding: EdgeInsets.all(8.0),
                child: Text('No categories found'),
              );
            }

            return Column(
              children: categories.map((category) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 12.0),
                  child: ServiceCategoryCard(
                    title: category.name,
                    subtitle: 'Κατηγορία παραπόνων',
                    icon: Icons.category,
                  ),
                );
              }).toList(),
            );
          },
        ),
      ],
    );
  }
}

class ServiceCategoryCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const ServiceCategoryCard({
    super.key,
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      //Box
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: const [
          BoxShadow(color: Colors.black12, blurRadius: 6, offset: Offset(0, 2)),
        ],
      ),
      child: Row(
        //Content
        children: [
          Container(
            //Icon
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Colors.green.shade50,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: Colors.green),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                //Title
                Text(
                  title,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
                const SizedBox(height: 4),
                //Subtitle
                Text(
                  subtitle,
                  style: const TextStyle(color: Colors.grey, fontSize: 12),
                ),
              ],
            ),
          ),
          //Arrow
          const Icon(Icons.chevron_right, color: Colors.grey),
        ],
      ),
    );
  }
}
