import type { GuideCategory, GuideWeek } from './-types';

const WEEKLY_PREGNANCY_SLUG = 'weekly-pregnancy';

export const guideCategories: GuideCategory[] = [
  {
    slug: 'baby-growth-monthly',
    title: 'Cập nhật sự phát triển của bé theo từng tháng',
    available: false,
  },
  {
    slug: WEEKLY_PREGNANCY_SLUG,
    title: 'Cập nhật thông tin thai kỳ hàng tuần',
    available: true,
  },
  { slug: 'pregnancy-signs', title: 'Dấu hiệu mang thai', available: false },
  { slug: 'food-for-mom', title: 'Thực phẩm cho mẹ bầu', available: false },
  { slug: 'breastfeeding', title: 'Nuôi con bằng sữa mẹ', available: false },
  { slug: 'baby-health', title: 'Sức khỏe của bé', available: false },
  { slug: 'first-aid', title: 'Sơ cứu', available: false },
  { slug: 'baby-feeding', title: 'Cho bé ăn', available: false },
  { slug: 'yoga-for-mom', title: 'Yoga cho mẹ bầu', available: false },
  { slug: 'food-for-baby', title: 'Thực phẩm cho bé', available: false },
  {
    slug: 'childcare-cautions',
    title: 'Những điều cần tránh khi chăm sóc trẻ',
    available: false,
  },
  { slug: 'mental-health', title: 'Sức khỏe tâm thần', available: false },
];

const WEEKLY_PREGNANCY_SUBTITLE = 'Cập nhật thông tin thai kỳ hàng tuần';

const weeklyPregnancyWeeks: GuideWeek[] = [
  {
    week: 1,
    title: 'Tuần đầu tiên của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Tuần đầu tiên thực chất được tính từ ngày đầu kỳ kinh cuối, lúc này quá trình rụng trứng còn chưa diễn ra.',
      },
      { type: 'heading', text: 'Sự phát triển của Con của bạn' },
      {
        type: 'paragraph',
        text: 'Cơ thể mẹ đang chuẩn bị cho quá trình rụng trứng. Trứng và tinh trùng chưa gặp nhau, nên về mặt sinh học bé chưa hình thành.',
      },
    ],
  },
  {
    week: 2,
    title: 'Tuần thứ 2 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Trong tuần này sự rụng trứng có thể đã xảy ra, điều này có nghĩa là việc thụ thai đã đến rất gần rồi.',
      },
      { type: 'heading', text: 'Sự phát triển của Con của bạn' },
      {
        type: 'paragraph',
        text: 'Tại thời điểm này Con của bạn vẫn còn là một khả năng có thể xuất hiện. Sự kết hợp giữa trứng và tinh trùng sẽ diễn ra sớm thôi.',
      },
    ],
  },
  {
    week: 3,
    title: 'Tuần thứ 3 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Quá trình thụ tinh diễn ra, hợp tử bắt đầu phân chia và di chuyển về phía tử cung.',
      },
      { type: 'heading', text: 'Sự phát triển của Con của bạn' },
      {
        type: 'paragraph',
        text: 'Hợp tử nhỏ bé đang phân chia thành nhiều tế bào và chuẩn bị làm tổ trong niêm mạc tử cung của mẹ.',
      },
    ],
  },
  {
    week: 4,
    title: 'Tuần thứ 4 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Phôi đã làm tổ trong tử cung, mẹ có thể bắt đầu nhận thấy những dấu hiệu mang thai đầu tiên.',
      },
      { type: 'heading', text: 'Sự phát triển của Con của bạn' },
      {
        type: 'paragraph',
        text: 'Phôi thai có kích thước chỉ bằng một hạt nhỏ, nhưng các cấu trúc nền tảng cho cơ thể bé đang dần hình thành.',
      },
    ],
  },
];

const weeksByCategory: Record<string, GuideWeek[]> = {
  [WEEKLY_PREGNANCY_SLUG]: weeklyPregnancyWeeks,
};

export function getCategory(slug: string): GuideCategory | undefined {
  return guideCategories.find((category) => category.slug === slug);
}

export function getWeeks(slug: string): GuideWeek[] {
  return weeksByCategory[slug] ?? [];
}

export function getWeek(slug: string, week: number): GuideWeek | undefined {
  return getWeeks(slug).find((item) => item.week === week);
}
