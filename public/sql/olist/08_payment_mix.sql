-- business question: how are orders actually paid for?
SELECT payment_type,
       COUNT(*) AS payments,
       ROUND(SUM(payment_value), 2) AS total_brl
FROM order_payments
GROUP BY payment_type
ORDER BY total_brl DESC;
