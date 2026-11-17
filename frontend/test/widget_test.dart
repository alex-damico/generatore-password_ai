import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/main.dart';

void main() {
  testWidgets('Verifies presence of required UI labels', (WidgetTester tester) async {
    await tester.pumpWidget(const PasswordGeneratorApp());

    expect(find.text('Includi Numeri'), findsOneWidget);
    expect(find.text('Includi Simboli'), findsOneWidget);
    expect(find.text('Lunghezza'), findsOneWidget);
    expect(find.text('Genera Password'), findsOneWidget);
  });
}
