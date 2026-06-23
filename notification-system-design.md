# Notification System Design
Stage 1 — Priority Notification Algorithm
Problem Statement

The system receives a continuous stream of campus notifications from a protected API.
The objective is to always display the top 10 most important unread notifications in a Priority Inbox.

Notification importance is determined using two criteria:

Notification Type Weight
Recency (Timestamp)

Priority order is:

Placement > Result > Event

This means Placement notifications are considered most important, followed by Result notifications, and finally Event notifications.

Input Format

The Notification API returns data in the following structure:

{
  "notifications": [
    {
      "ID": "b283218f-ea5a-4b7c-93a9-1f2f240d64b0",
      "Type": "Placement",
      "Message": "CSX Corporation hiring",
      "Timestamp": "2026-04-22 17:51:18"
    }
  ]
}

Each notification contains:

ID → Unique notification identifier
Type → Notification category (Placement, Result, Event)
Message → Notification content
Timestamp → Creation time of notification
Priority Calculation Strategy

To compare notifications efficiently, each notification type is assigned a numerical weight.

Notification Type	Weight
Placement	3
Result	2
Event	1

Higher weight means higher priority.

Example:

Placement > Result because 3 > 2
Sorting Logic

Notifications are ranked using the following rules:

Rule 1: Compare Notification Type Weight

Higher weight notifications appear first.

Example:

Placement notification ranks above Result notification

because:

3 > 2
Rule 2: If Weight is Equal, Compare Timestamp

If two notifications belong to the same category, the newer notification is given higher priority.

Example:

Notification A:

Result | 17:51:30

Notification B:

Result | 17:50:54

Since both are Result notifications:

Weight = 2

Weights are equal, so timestamp is compared.

Because:

17:51:30 > 17:50:54

Notification A is ranked higher.

Algorithm Steps
Step 1: Fetch Notifications

Notifications are fetched from the protected Notification API using Bearer authentication.

Step 2: Assign Priority Weights

Each notification type is mapped to a numerical weight.

Step 3: Sort Notifications

Notifications are sorted using:

Type weight (descending)
Timestamp (descending)
Step 4: Select Top 10

After sorting, only the first 10 notifications are selected.

Pseudo representation:

Fetch notifications
      ↓
Assign weights
      ↓
Sort by weight
      ↓
If same weight, sort by timestamp
      ↓
Take top 10
Time Complexity

Let n be the number of notifications.

Fetching
O(n)
Sorting
O(n log n)
Selecting Top 10
O(10)

Overall complexity:

O(n log n)
Optimization for Real-Time Incoming Notifications

The notification stream is continuous, meaning new notifications may arrive frequently.

Sorting the entire dataset every time a new notification arrives is inefficient.

A better approach is to maintain a Min Heap (Priority Queue) of size 10.

Heap Strategy
Insert incoming notification into heap
Heap stores only top 10 highest priority notifications
If heap size exceeds 10:
remove lowest priority notification

Benefits:

Insertion Complexity
O(log 10) ≈ O(1)
Memory Usage
O(10)

This makes the system scalable for large notification streams.

Final Approach

The implemented solution uses sorting for simplicity and correctness.

For production-scale systems with continuous notification inflow, a fixed-size min heap is recommended for efficient top-10 maintenance.