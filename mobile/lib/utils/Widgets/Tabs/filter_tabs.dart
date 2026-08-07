import 'package:service_management_mobile/utils/config.dart';
import 'package:flutter/material.dart';

// Κοινό widget για οριζόντια tabs φιλτραρίσματος.
//
// Το selectedValue δείχνει ποιο tab είναι ενεργό.
//
// Όταν ο χρήστης πατήσει ένα tab,
// το widget επιστρέφει την τιμή του στο parent
// μέσω του onChanged.
//
// Το ενεργό tab εμφανίζει underline.

class FilterTabs extends StatelessWidget {
  final List<FilterTabItem> items;
  final String? selectedValue;
  final ValueChanged<String?> onChanged;

  const FilterTabs({
    super.key,
    required this.items,
    required this.selectedValue,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: items.map((item) {
        // Ελέγχει αν το συγκεκριμένο tab είναι ενεργό.
        final isActive = selectedValue == item.value;

        return Expanded(
          child: InkWell(
            // Επιστρέφει την τιμή του tab στο parent.
            onTap: () => onChanged(item.value),
            borderRadius: BorderRadius.circular(8),
            child: Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Label του tab.
                  Text(
                    item.label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: isActive ? Config.primaryColor : Config.cityMuted,
                      fontSize: 13,
                      fontWeight: isActive ? FontWeight.w800 : FontWeight.w600,
                    ),
                  ),

                  const SizedBox(height: 8),

                  // Animated underline του ενεργού tab.
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 180),
                    height: 3,
                    width: isActive ? 42 : 0,
                    decoration: BoxDecoration(
                      color: Config.primaryColor,
                      borderRadius: BorderRadius.circular(999),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      }).toList(),
    );
  }
}

// Δεδομένα που χρειάζεται κάθε tab.
class FilterTabItem {
  final String label;
  final String? value;

  const FilterTabItem({required this.label, required this.value});
}
