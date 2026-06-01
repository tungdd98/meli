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
        text: 'Thời điểm này được mặc định xem như tuần thứ 1 của thai kỳ, tuy nhiên việc thụ thai vẫn chưa thực sự xảy ra cho đến tuần thứ 2 hoặc thứ 3.',
      },
      {
        type: 'paragraph',
        text: 'Do khó có thể tính chính xác được thời điểm thụ thai, người ta sử dụng ngày đầu tiên của kỳ kinh cuối hay Last menstrual period (LMP) như là ngày đầu tiên của thai kỳ. Khoảng 40 tuần sau chu kỳ kinh nguyệt cuối này sẽ là ngày dự sinh.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Ngay lúc này, quá trình thụ tinh và làm tổ vẫn chưa xảy ra. Trong thời gian từ 1 đến 2 tuần, một trong số các trứng trưởng thành sẽ được giải phóng từ buồng trứng của mẹ, trứng sẽ gặp các tế bào tinh trùng và được thụ tinh bởi một trong số các tinh trùng đó. Cùng với việc làm tổ, hành trình chào đời của bé bắt đầu.',
      },
      { type: 'heading', text: 'Những thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Mẹ vẫn chưa cảm nhận được dấu hiệu hay sự thay đổi nào bởi vì thai kỳ vẫn chưa thực sự xảy ra.',
      },
      { type: 'heading', text: 'Mẹ nên làm gì vào thời điểm này' },
      {
        type: 'paragraph',
        text: 'Để thúc đẩy việc thụ thai, mẹ nên ngủ đủ giấc, nghỉ ngơi điều độ, tập thể dục nhẹ nhàng và ăn uống khoa học. Điều quan trọng nhất là phải có quan hệ tình dục.',
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
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Tại thời điểm này con của mẹ vẫn còn là một khả năng có thể xuất hiện. Sự kết hợp giữa trứng và tinh trùng sẽ diễn ra sớm thôi. Sự rụng trứng: Rụng trứng có nghĩa là một trứng trưởng thành được giải phóng khỏi buồng trứng. Một khi trứng rụng, trứng sẽ bắt đầu di chuyển đến vòi trứng chờ gặp tinh trùng may mắn bơi khỏe nhất và chiến thắng cuộc đua với hàng triệu tinh trùng khác. Điều này không nhất thiết phải xảy ra ngay giữa kỳ kinh nguyệt. Sự rụng trứng có thể xảy ra trong bất kỳ ngày nào trong giữa ngày thứ 7 và ngày thứ 21 của một chu kỳ kinh nguyệt bình thường thường từ 21 đến 35 ngày.',
      },
      { type: 'heading', text: 'Những thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Mẹ có thể có cơ hội mang thai cao nếu có giao hợp trong thời gian này vì trứng sẽ rụng vào thời điểm này hoặc sau vài ngày. Chất dịch nhầy: Do có liên quan giữa dịch nhầy cổ tử cung và sự rụng trứng, mẹ có thể kiểm tra dịch nhầy hàng ngày để nhận biết kết cấu của chất nhầy. Tùy vào kết cấu của chất nhầy cổ tử cung mà mẹ nhận thấy hàng ngày có thể giúp mẹ nhận biết ngày trứng rụng dễ dàng hơn.',
      },
      { type: 'heading', text: 'Nên làm gì vào thời điểm này' },
      {
        type: 'paragraph',
        text: 'Mẹ nên chuẩn bị cho một cơ thể khỏe mạnh để sẵn sàng thụ thai bằng việc bổ sung axit folic. Nhiều nghiên cứu đã chỉ ra rằng axit folic có lợi cho sức khỏe của phụ nữ đang chuẩn bị mang thai và con cái của họ giúp giảm nguy cơ bệnh lý tim bẩm sinh, đái tháo đường thai kỳ và sinh non. Tại thời điểm này nếu mẹ còn đang sử dụng thuốc, nên tham khảo ý kiến bác sĩ hoặc dược sĩ để có lời khuyên tốt nhất cho việc sử dụng an toàn trong thời kỳ mang thai hay không.',
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
        text: 'Mặc dù mẹ có thể chưa cảm nhận được sự thay đổi nào vào thời điểm này, mẹ cũng có thể đã mang thai rồi – chúc mừng mẹ!',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Chỉ một tinh trùng bơi nhanh nhất trong triệu tinh trùng gặp được trứng của mẹ để có thể thụ tinh nhưng sự thụ tinh chỉ có thể xảy ra nếu tinh trùng xuyên qua lớp ngoài của trứng để chui vào trong. Hợp tử: Khi tinh trùng kết hợp với trứng, nó được gọi là hợp tử. Hợp tử sẽ bắt đầu di chuyển dần xuống ống dẫn trứng đến tử cung. Quá trình có thể mất 5 – 6 ngày sau khi trứng đã được thụ tinh. Phôi nang: Trong thời gian này, hợp tử phân chia để tạo thành một khối tế bào được gọi là phôi nang. Một tế bào đơn lẻ tự phân chia thành 2, 4, 8, 16, 32 cho đến ngày con của mẹ phát triển thành một em bé trưởng thành.',
      },
      { type: 'heading', text: 'Những thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Nếu mẹ có quan hệ tình dục đúng trong thời gian trứng rụng, trứng có thể đã được thụ tinh với một tinh trùng khỏe mạnh. Nếu sự thụ tinh xảy ra, cơ thể của mẹ có thể sẽ bắt đầu sản xuất progesterone và estrogen để nuôi dưỡng và hỗ trợ con của mẹ đến khi nhau thai phát triển hoàn toàn vào khoảng tuần thứ 10 của thai kỳ.',
      },
      { type: 'heading', text: 'Nên làm gì vào thời điểm này' },
      {
        type: 'paragraph',
        text: 'Ăn trái cây tươi có nhiều vitamin C sẽ giúp cho cơ thể của mẹ hấp thụ sắt, một khoáng chất dinh dưỡng mà cơ thể cần để tạo ra nhiều máu hơn và hỗ trợ cho sự phát triển của con của mẹ . Hơn nữa mẹ có thể ăn nhiều đạm để thúc đẩy các mô mới ở bé đang phát triển.',
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
        text: 'Thời điểm này, quá trình làm tổ của phôi đã hoàn tất. Cơ thể của mẹ sẽ bắt đầu có hormone thai kỳ, vì vậy que thử thai có thể sẽ cho kết quả dương',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Kích thước của con của mẹ tương ứng bằng một hạt anh túc, thuật ngữ y học được gọi là phôi nang. Vào lúc này con của mẹ đã di chuyển từ ống dẫn trứng vào tử cung của mẹ. Sự phân chia: Ngay sau khi làm tổ ổn định trong tử cung, phôi nang sẽ trải qua quá trình phân chia làm 2 nhóm lớn. Các tế bào ở trung tâm sẽ tạo thành phôi thai. Các tế bào ở ngoài bắt đầu biệt hóa và hình thành các liên kết với các mạch máu của mẹ, về sau những tế bào này trở thành nhau thai trong vài tuần. Chỉ có các tế bào lớp ngoài mới sản xuất hormon hCG, chất làm que thử thai cho kết quả dương tính. Ba lớp của phôi thai: Vào cuối tuần này, phôi thai đã bắt đầu phân chia ba lớp khác nhau. Lớp ngoài cùng (ngoại bì) nơi não, xương sống, tủy sống và các dây thần kinh của con của mẹ sẽ phát triển từ đó. Da, tóc và móng tay cũng phát triển từ lớp này. Lớp giữa (trung bì) là nơi phát triển của khung xương và cơ bắp, đồng thời cũng là nơi hình thành tim và hệ thống tuần hoàn máu. Lớp trong cùng (nội bì) trở nên nguồn gốc hình thành phổi, ruột và hệ tiết niệu. Do nhau thai vẫn chưa được hình thành đầy đủ nên con của mẹ vẫn nhận các chất dinh dưỡng từ túi noãn hoàng của trứng.',
      },
      { type: 'heading', text: 'Những thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Ngay cả lúc này mẹ vẫn có thể không biết rằng mình đang mang thai. Nhưng đã bắt đầu có rất nhiều sự thay đổi trong cơ thể mẹ. Ảnh hưởng của nội tiết tố: Nếu nhạy cảm, mẹ đã có thể cảm nhận được những dấu hiệu sớm của thai kỳ như đầy hơi, đau quặn bụng và thay đổi tâm trạng. Các triệu chứng này xảy ra do cơ thể mẹ tiết hormone estrogen và progesterone nhiều hơn. Đau quặn bụng: Mẹ có thể có triệu chứng đau quặn bụng hoặc ra huyết âm đạo lượng ít . Nguyên nhân là do con của mẹ đang làm tổ trong thành tử cung của mẹ. Và khi thành tử cung dày lên mẹ có thể có huyết trắng.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm lúc này' },
      {
        type: 'paragraph',
        text: 'Đây là thời điểm mà mẹ có thể mong muốn thử thai. Nồng độ hormone hCG của mẹ bây giờ đã đủ cao để cho kết quả dương tính nếu có thai. Nhưng nếu mẹ nhận được kết quả âm tính, hãy chờ đợi. Có thể cần đến 1 tuần sau khi trễ kinh để có kết quả thử thai dương tính. Lần khám thai đầu tiên của mẹ: Nếu nhận được kết quả dương tính, có thể mẹ đang rất mong muốn để được khám thai lần đầu tiên. Tuy nhiên một số bác sĩ sản phụ khoa có thể yêu cầu mẹ đợi cho đến khi thai nhi được ít nhất 6 đến 8 tuần tuổi để hẹn thăm khám lại.',
      },
    ],
  },
  {
    week: 5,
    title: 'Tuần thứ 5 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Tuần này con của mẹ đã bắt đầu bước vào giai đoạn phôi thai, thời điểm khi khối tế bào đã trở nên rõ rệt và đã trở thành một sinh linh bé nhỏ.',
      },
      {
        type: 'paragraph',
        text: 'Đây có thể là tuần đầu tiên mẹ cảm thấy trễ kinh. Lượng hormone hCG hay hormone thai kỳ tăng cao đủ để mẹ thử thai và xác nhận đã mang thai hay chưa.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Giai đoạn phôi thai bắt đầu khoảng 3 tuần sau khi thụ tinh thành công và phát triển từ một tế bào đơn lẻ thành một cơ thể người độc lập. con của mẹ sẽ nhanh chóng phát triển trong bụng mẹ và có kích thước khoảng 1mm – nhỏ bằng một hạt vừng. Trái tim: Trái tim đã bắt đầu được hình thành dưới dạng một ống nhỏ và con của mẹ đã có các mạch máu riêng biệt, đưa máu tuần hoàn khắp cơ thể. Đồng thời một số mạch máu đã thông nối với mạch máu của mẹ và sau này sẽ trở thành dây rốn. Đuôi nhỏ: lớp tế bào ngoài cùng của con của mẹ sau khi gấp lại đã tạo nên một lòng ống, trong y học nó được gọi là ống thần kinh. Ống thần kinh sẽ phát triển và tạo hình dạng như một cái đuôi trong khoảng thời gian này, trông giống như con nòng nọc bé nhỏ, nhưng mẹ cũng không phải lo lắng vì đuôi nhỏ này sẽ quay trở lại vào tuỷ sống trước ngày sinh. Đa số sự phát triển của tế bào trong giai đoạn này đều diễn ra trong não.',
      },
      { type: 'heading', text: 'Những thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Vào thời điểm này mẹ có thể đã nhận thấy việc bị trễ kinh. Điều này có nghĩa là mẹ đang mang thai và mẹ cũng có thể cảm thấy dễ mệt mỏi hơn bình thường do cơ thể đang bắt đầu làm việc nhiều hơn để nuôi dưỡng một sinh linh bé nhỏ. Nghén: Các loại hormone trong cơ thể của mẹ đang bắt đầu tăng cao nhanh hơn trong tuần này đến mức làm cho mẹ bị ốm nghén. Tuy nhiên mẹ cũng không thể làm gì hơn ngoài việc điều chỉnh chế độ ăn và đợi giai đoạn này qua đi. Tình trạng này sẽ giảm dần trong vài tuần tới, một số mẹ cho biết ăn bạc hà hoặc gừng có thể giảm ốm nghén.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm lúc này' },
      {
        type: 'paragraph',
        text: 'con của mẹ sẽ được nhận tất cả các chất mà mẹ hấp thu. Do vậy, mẹ nên lựa chọn ăn uống lành mạnh và đủ chất dinh dưỡng. Nếu mẹ không chắc chắn liệu chế độ ăn uống của mình có đủ đáp ứng nhu cầu của con của mẹ không, mẹ có thể bổ sung thêm vitamin tổng hợp dành cho thai kỳ. Ăn uống lành mạnh: Nếu mẹ thèm ăn đồ ăn nhanh, đồ ăn chiên hay thực phẩm chế biến sẵn, hãy cố gắng thay các bữa ăn này bằng rau củ nướng, trái cây tươi, cá áp chảo hay các loại hạt. Đồng thời tránh tất cả các loại thức uống có cồn hay các chất độc hại khác.',
      },
    ],
  },
  {
    week: 6,
    title: 'Tuần thứ 6 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Tuần này trái tim của con của mẹ bắt đầu đập. Các đặc điểm trên khuôn mặt như má, cằm và hàm cũng đã bắt đầu hình thành. Mắt và mũi giờ cũng đã có',
      },
      {
        type: 'paragraph',
        text: 'Mẹ có thể bắt đầu cảm thấy mệt hơn trong thời gian này.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Ở giai đoạn này, kích thước của con của mẹ bé bằng một hạt táo – kích thước chiều dài khoảng 5mm. Nếu siêu âm đầu dò âm đạo, mẹ có thể nghe thấy tiếng đập của trái tim bé nhỏ. Khuôn mặt bắt đầu hình thành: Cấu trúc khuôn mặt của con của mẹ bắt đầu phát triển. Mũi và mắt nhỏ xinh đã bắt đầu hình thành nhưng chúng chỉ nhỏ như những chấm nhỏ trên cái đầu ngoại cỡ. Ngoài ra các túi mang và cung mang sẽ phát triển thành một phần của tai và hàm của con của mẹ giúp tạo nên một khuôn mặt dễ thương và đáng yêu. Tiên cá bé nhỏ: Phần thân dưới của con của mẹ phát triển chậm hơn so với phần thân trên bởi vậy ban đầu con của mẹ trông giống như một tiên cá. Việc hình thành các cơ quan nội tạng: Hệ thống hô hấp được hình thành bởi một cung họng hay về mặt y học được gọi là Pharyngeal arch. Bên trong cơ thể, các tế bào cấu tạo nên hệ tiêu hóa đang dần phát triển. Một số cụm tế bào – nụ mô sau này sẽ phát triển thành phổi, gan và thận.',
      },
      { type: 'heading', text: 'Những thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Trong thời gian này phần lớn các mẹ đều cảm thấy mệt mỏi trong khi mang thai và có đến gần 80% trải qua ốm nghén. Nguyên nhân của sự mệt mỏi là do cơ thể mẹ bầu sản xuất nhiều máu hơn bình thường để cung cấp đủ oxy và chất dinh dưỡng đến con của mẹ . Mẹ có thể cảm thấy mệt mỏi, kiệt sức, lượng đường trong máu thấp và giảm huyết áp. Nếu mẹ đang cố gắng tìm cách giảm ốm nghén, hãy cố gắng loại bỏ các loại thức ăn cay và dầu mỡ khỏi chế độ ăn uống của mẹ. Ngoài ra mẹ nên uống đủ nước và nghỉ ngơi đầy đủ. Núm vú: Mẹ sẽ cảm nhận thấy ngực đẩy núm vú ra ngoài nhiều hơn bình thường. Điều này do lượng máu chảy đến vùng ngực của mẹ nhiều hơn để chuẩn bị cho việc cho con bú sau này. Chảy máu âm đạo: Nếu mẹ nhận thấy âm đạo chảy máu ra ít hoặc nhiều, mẹ nên tham khảo ý kiến bác sĩ ngay lập tức. Đó có thể là dấu hiệu dọa sảy thai hay mang thai ngoài tử cung. Mang thai ngoài tử cung là khi trứng đã thụ tinh làm tổ ở một nơi khác ngoài tử cung và cần được điều trị ngay sau khi phát hiện.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm lúc này' },
      {
        type: 'paragraph',
        text: 'Vài tuần tới sẽ là thời điểm quan trọng đối với con của mẹ do các cơ quan quan trọng bắt đầu hình thành. Cả mẹ và con cần bổ sung đầy đủ dinh dưỡng cho cơ thể, ngủ đủ giấc và tốt hơn hết nên tránh căng thẳng bởi quá căng thẳng có thể ảnh hưởng xấu đến trí não đang phát triển của con của mẹ . Bởi vậy đây là thời điểm nên bắt đầu uống bổ sung vitamin tổng hợp cho mẹ bầu nếu trước đó mẹ chưa uống.',
      },
    ],
  },
  {
    week: 7,
    title: 'Tuần thứ 7 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Đầu của con của mẹ giờ đây lớn hơn phần còn lại của cơ thể vì não của con của mẹ đang phát triển nhanh chóng. Đối với nhiều mẹ, tuần này có thể là',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'con của mẹ hiện dài khoảng 1cm – bằng kích thước của một quả việt quất. Ở giai đoạn này đầu là phần lớn nhất của cơ thể, với tai, mắt, lỗ mũi, miệng và lưỡi đang dần dần hình thành. Sự phát triển của con của mẹ trong tuần này phần lớn tập trung vào đầu với tốc độ 100 tế bào não được phát triển mỗi phút. Dây rốn: Tuần này, dây rốn của con của mẹ đang phát triển. Dây rốn kết nối con của mẹ với nhau thai để vận chuyển oxy, các chất dinh dưỡng thiết yếu và loại bỏ các chất thải bằng cách vận chuyển nó trở lại hệ thống tuần hoàn của mẹ. Nếu mọi thứ diễn ra theo đúng dự tính, con của mẹ sẽ chào đời sau 33 tuần kể từ bây giờ và khi đó dây rốn sẽ được cắt. Tay và chân: Các bộ phận cơ thể còn lại của con của mẹ đã bắt đầu hoàn thiện theo hình dạng con người. Các nụ tay và nụ chân đang nhú ra dài và khỏe hơn hơn trong tuần này. Sau đó, chúng sẽ tự phân chia thành các phần bàn tay, cánh tay, và vai và các phần chân, đầu gối và bàn chân. Các cơ quan nội tạng: Hai quả thận của con của mẹ đã bắt đầu xuất hiện, trong khi cả hai tuyến tụy và lách đang bắt đầu hình thành trong tuần này.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Trong giai đoạn này một triệu chứng chính mà mẹ gặp phải là số lần đi tiểu tăng lên. Nguyên nhân là do tử cung ngày càng lớn gây áp lực lên vùng bàng quang và lưu lượng máu tăng lên để nuôi dưỡng sự phát triển của con của mẹ . Những triệu chứng khác như buồn nôn có thể giảm dần vào tam cá nguyệt thứ 2 nhưng việc đi tiểu nhiều lần có thể sẽ tăng lên dần dần mỗi tháng cho đến khi con của mẹ chào đời. Khẩu vị của mẹ có thể thay đổi Nồng độ hormone trong cơ thể tăng cao có thể khiến cho mẹ có cảm giác thèm ăn những món lạ hoặc hoàn toàn không thèm ăn. Một số mẹ có thể nổi mụn hoặc tiết nhiều nước bọt hơn.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm' },
      {
        type: 'paragraph',
        text: 'Bộ não của con của mẹ đang phát triển nhanh chóng trong những ngày này vì vậy các mẹ nên tránh tất cả các loại chất độc. Vì căng thẳng quá nhiều sẽ giải phóng cortisol hay gọi là hormone gây căng thẳng và quá nhiều cortisol sẽ cản trở việc phát triển lành mạnh của trẻ, mẹ nên tránh các tình huống hoặc xung đột căng thẳng. Chẳng mấy chốc ngực mẹ cũng sớm tăng kích thước to dần lên. Điều này có thể khiến mẹ đau và khó chịu, các mẹ có thể sử dụng áo ngực dành cho mẹ bầu để đối phó với triệu chứng này.',
      },
    ],
  },
  {
    week: 8,
    title: 'Tuần thứ 8 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Từ tuần thứ 8 con của mẹ thể hiện phản xạ khi được chạm vào, vì vậy, hãy mong chờ con của mẹ bắt đầu phản ứng với hành động của mẹ.',
      },
      {
        type: 'paragraph',
        text: 'Khứu giác của mẹ có thể nhạy cảm hơn, thèm ăn một số món nhất định và có cảm giác ngán các món còn lại.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'con của mẹ hiện có kích thước khoảng 16cm – kích thước của một quả mâm xôi. Đầu của con của mẹ lớn hơn thân và các cơ quan nội tạng sẽ sớm bắt đầu hoạt động. Khuôn mặt: Mũi, mí mắt và môi của con của mẹ đang phát triển nhanh chóng vào thời điểm này và trông ngày càng giống một em bé nhỏ xinh. Võng mạc bắt đầu hình thành, đôi mắt đã thấy rõ ràng hơn và các nếp gấp mí mắt che đi một phần mắt. Các ngón tay có trước các ngón chân: Cơ thể con người phát triển từ trên xuống dưới. Bàn tay của con của mẹ bây giờ có màng dính giữa các ngón tay. Điều này khiến cho bàn tay của con của mẹ trông giống như bàn tay của một con ếch. Các ngón chân chưa lộ ra rõ và dính vào nhau trông giống như đang đi một đôi tất nhỏ. Chẳng mấy chốc, cấu trúc giống như đuôi cũng sẽ thu lại hoàn toàn vào cột sống.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Mẹ có thể nhận thấy bụng vẫn chưa to lên nhiều nhưng giờ đây tử cung của mẹ đang dần lớn lên. Mẹ có thể cảm thấy mệt mỏi, ngực căng đầy và đi tiểu thường xuyên hơn. Sự gia tăng đáng kể của hormone làm không những tăng nhạy cảm của khứu giác mà còn làm thay đổi khẩu vị thường ngày. Do đó, có thể khiến mẹ thèm ăn hơn hoặc hoàn toàn không muốn ăn. Nhưng cho dù thế nào đi chăng nữa, mẹ bầu hãy ăn uống lành mạnh. Mẹ đừng quên rằng những gì mẹ lựa chọn ăn, con của mẹ cũng đang ăn.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm' },
      {
        type: 'paragraph',
        text: 'Nếu bị buồn nôn, mẹ thử giảm lượng thức ăn trong mỗi bữa nhưng ăn thường xuyên hơn và uống nhiều nước có thể giúp giảm bớt các triệu chứng.',
      },
    ],
  },
  {
    week: 9,
    title: 'Tuần thứ 9 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Các cơ quan nội tạng của con của mẹ bắt đầu hiện diện, và mẹ có thể nghe thấy nhịp tim của bé trong lần hẹn khám bác sĩ tiếp theo. Mẹ có thể cảm',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Tuần này các cơ chính và các bộ phận quan trọng bắt đầu hình thành và con của mẹ hiện có kích thước dài khoảng 23 mm – bằng kích thước của một quả nho. Gan, thận, phổi và não đã sẵn sàng bắt đầu hoạt động, và chồi vị giác đã đang phát triển. Đôi tai nhỏ đang bắt đầu trở nên rõ ràng hơn và sẽ sớm phát triển vào vị trí. Bộ phận sinh dục: Mặc dù không thể kết luận giới tính của thai nhi vào thời điểm này nhưng bộ phận sinh dục đã bắt đầu hình thành và giới tính sẽ sớm được xác định. Các ngón tay: Các ngón tay và các ngón chân và có màng được định hình rõ ràng hơn. Vào cuối tuần này, mô xương của các chi trên bắt đầu hình thành, quá trình này được gọi là cốt hóa. Trái tim: Cho đến lúc này, tim của con của mẹ đã hoạt động được một thời gian và đang phát triển các van để phân chia các ngăn. Ở thời điểm này mẹ có thể nghe thấy nhịp tim bằng siêu âm doppler thai nhi.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Khi nhau thai phát triển để vận chuyển các chất dinh dưỡng đến con của mẹ , mẹ có thể cảm thấy mệt mỏi. Lượng đường trong máu và huyết áp của mẹ có thể giảm xuống, trong khi lượng hormone và tốc độ trao đổi chất tăng lên. Sự phát triển của tử cung: Lúc này tử cung của mẹ sẽ tăng gấp đôi kích thước. Và cân nặng của mẹ cũng có thể tăng lên. Trong tam cá nguyệt đầu tiên mẹ thường tăng khoảng 0.5 đến 2 kg. Ợ nóng: Mẹ có thể bị ợ nóng hoặc táo bón nhưng mẹ đừng lo lắng, đây là những triệu chứng thường gặp bắt đầu vào khoảng tháng thứ hai của thai kỳ.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm' },
      {
        type: 'paragraph',
        text: 'Nếu mẹ trên 35 tuổi, có chồng lớn hơn nhiều tuổi hoặc chồng có tiền sử gia đình mắc các bệnh di truyền, thì bây giờ là thời điểm trao đổi cân nhắc với bác sĩ về các xét nghiệm sàng lọc gen di truyền thông thường. Những sàng lọc như vậy thường được tiến hành từ tuần thứ 10 trở đi. Cố gắng tránh thức ăn cay và nhiều dầu mỡ để tránh bị ợ nóng, nhưng nếu không đỡ, mẹ có thể uống thuốc kháng axit dạ dày để giảm các triệu chứng. Mẹ nên chủ động đi vệ sinh khi cần; nhịn đi đại tiện có thể làm cơ của ruột yếu đi, ảnh hưởng đến nhu động ruột gây táo bón.',
      },
    ],
  },
  {
    week: 10,
    title: 'Tuần thứ 10 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ hiện đã bước vào tuần cuối cùng của thời kỳ phôi thai và sau giai đoạn này, nguy cơ sảy thai sẽ giảm đi rất nhiều.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'con của mẹ đã bước vào tuần cuối cùng của thời kỳ phôi thai. Vì vậy, con của mẹ sắp chuyển sang giai đoạn thai nhi, và kéo dài cho đến khi chào đời. con của mẹ lúc này dài khoảng 3 cm và nặng gần 4g – bằng kích thước của một quả ô liu xanh. Tim của con của mẹ đập nhanh gấp hai đến ba lần tim của mẹ, giờ đây có thể nghe thấy rõ ràng. Và hơn nữa, con của mẹ đã có chuyển động rõ ràng đến mức có thể nhìn thấy khi siêu âm. Giới tính: Mặc dù đã có những đặc điểm khác biệt nhỏ về giới tính ở cơ quan sinh dục ngoài, nhưng điều đó không đủ cho phép xác định giới tính chính xác. Tuy nhiên, nếu con của mẹ là bé trai, hai tinh hoàn đã bắt đầu sản xuất hormone testosterone. Cơ thể: Phần ngoài của tai đã phát triển toàn diện, và mí mắt rõ hơn nhưng vẫn khép lại. Xương và sụn đang hình thành, và các vết lõm nhỏ trên chân đang phát triển thành đầu gối và mắt cá chân. Cánh tay hoàn chỉnh với khủy tay đã có thể uốn cong. Những mầm răng đầu tiên của con của mẹ đang phát triển dưới lợi và dạ dày đang tiết ra dịch tiêu hóa.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Tổng lượng máu của mẹ có thể tăng đến 30-50% trong suốt thời kỳ mang thai. Nếu mẹ có bệnh tim trước khi mang thai, mẹ phải hết sức thận trọng vì lượng máu tăng lên khiến tim làm việc quá tải . Tăng tiết dịch âmđạo: Do lượng máu tăng lên, mẹ có thể bị giãn tĩnh mạch và tăng tiết dịch âm đạo. Miễn là dịch âm đạo có màu trắng, loãng và không có mùi thì mẹ không phải lo lắng. Tuy nhiên, nếu khí hư có màu hơi vàng hoặc hơi xanh hoặc có kết cấu đặc hoặc không đều, đó có thể là dấu hiệu của nhiễm trùng. Giãn tĩnh mạch: Các tĩnh mạch căng phồng là hệ quả bình thường do lượng máu tăng lên đáng kể. Chúng có thể ở dạng giãn tĩnh mạch, thường xuất hiện dưới dạng các tĩnh mạch màu xanh giãn lớn trên chân hoặc tĩnh mạch mạng nhện, là một nhóm nhỏ các tĩnh mạch có thể nhìn thấy và tỏa ra hình quạt từ một điểm trên cánh tay, ngực hoặc mặt. Giãn tĩnh mạch có thể gây đau nhưng tĩnh mạch mạng nhện thì thường không.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm lúc này' },
      {
        type: 'paragraph',
        text: 'Mẹ cần uống nhiều nước khi mang thai. Nước rất cần thiết cho mẹ và thai nhi vì lượng máu của mẹ và nước ối của con của mẹ tăng lên. Nếu mẹ từ 35 tuổi trở lên hoặc có người thân trong gia đình mắc các bệnh di truyền, đã đến lúc cần cân nhắc xét nghiệm sàng lọc gen di truyền. Thường được thực hiện từ tuần 10 đến 14 của thai kỳ. Xét nghiệm có thể được thực hiện cùng lịch hẹn siêu âm. Mẹ cũng có thể muốn tiêm phòng cúm phòng tránh bị ốm khi mang thai. Nhiều bác sĩ sản phụ khoa khuyên nên tiêm phòng cúm và ho gà trong thai kỳ để bảo vệ mẹ và thai nhi.',
      },
    ],
  },
  {
    week: 11,
    title: 'Tuần thứ 11 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ hiện nay đã trở thành một thai nhi. 😊 Điều này có nghĩa là em bé của mẹ đã vượt qua giai đoạn phôi thai và giờ chính thức được gọi là thai',
      },
      {
        type: 'paragraph',
        text: 'Tại thời điểm này, tất cả các bộ phận chính trên cơ thể của con của mẹ đã phát triển. Vì mẹ sắp bước vào tam cá nguyệt thứ hai, nhiều triệu chứng khó chịu của thai kỳ có thể đã giảm bớt.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'con của mẹ lớn hơn 4cm một chút và nặng khoảng 8 g – bằng kích thước của một củ tỏi . Mặc dù chưa thể xác định được giới tính nhưng buồng trứng nhỏ đang phát triển nếu con của mẹ là con gái, và kiểm tra bằng siêu âm có thể thấy chuyển động của thai nhi – mặc dù mẹ chưa cảm nhận được. Đầu: Đầu của con của mẹ lúc này to và tròn hơn, chiếm một nửa chiều dài cơ thể. Mí mắt được hợp nhất, và đôi tai đã di chuyển đến gần vị trí cuối cùng. Bàn tay: Bàn tay và bàn chân có màng đang bắt đầu tách ra và có hình dạng rõ ràng hơn. Ở đầu các ngón tay, bắt đầu xuất hiện các khoảng trống, từ đây sẽ mọc ra các móng tay nhỏ. Các nội tiết tố và tế bào máu: Nhau thai của con của mẹ đang hoạt động tốt hơn từng ngày, do đó hormone được sản xuất ngày càng nhiều hơn. Gan hiện đang là cơ quan chính đang tạo ra các tế bào hồng cầu.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Bây giờ mẹ có thể có nhiều năng lượng hơn và ít thay đổi tâm trạng hơn vì nhau thai của con của mẹ đã đảm nhận việc sản xuất hormone. Tăng cảm giác thèm ăn: Mẹ có thể cảm thấy thèm ăn hơn trong những ngày này. Nhưng không phải vì đang ăn cho hai người mà mẹ có thể ăn tất cả mọi thứ. Mẹ nên tăng cân có kiểm soát khi mang thai bằng cách chọn những thực phẩm bổ dưỡng nhất và hạn chế tối đa thực phẩm chế biến sẵn.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm lúc này' },
      {
        type: 'paragraph',
        text: 'Cơ thể mẹ đang nỗ lực làm việc cho cả con của mẹ và nhau thai. Để duy trì năng lượng, mẹ nên cố gắng duy trì sự năng động và đảm bảo lượng lượng đường trong máu. Tập luyện nhẹ nhàng và thường xuyên ăn các bữa phụ với các loại tinh bột dạng phức tạp là một trong những cách tốt nhất mẹ có thể làm. Giảm caffein: Nếu mẹ thường uống nhiều trà hoặc cà phê, mẹ có thể phải hạn chế nó. Một số nghiên cứu chỉ ra rằng giảm caffein có thể giảm nguy cơ sảy thai và sinh con nhẹ cân.',
      },
    ],
  },
  {
    week: 12,
    title: 'Tuần thứ 12 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ hiện có thể khép các ngón tay bé nhỏ và nắm tay lại một chút. Và chúc mừng mẹ, giờ đây mẹ có thể đi vệ sinh ít thường xuyên hơn trước đây',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Khoảng hai tuần trước, con của mẹ bắt đầu hít vào thở ra nước ối xung quanh mình, và bây giờ bé đã hít thở nhuần nhuyễn hơn. Bằng cách này, thai nhi đang xây dựng khả năng thở khi chào đời. Còn từ bây giờ cho đến đến lúc sinh, oxy đến từ sự tuần hoàn máu của mẹ qua nhau thai. Phát triển các phản xạ: Do não tăng kích thước và độ phức tạp, con của mẹ sẽ bắt đầu phát triển phản xạ. Đồng thời trong giai đoạn này, nếu mẹ vỗ nhẹ vào bụng, con của mẹ có thể thực hiện một số chuyển động để đáp trả, mặc dù mẹ chưa có thể cảm nhận được. Hệ tiêu hóa: Trong tuần này, hệ tiêu hoá của con của mẹ bắt đầu hoạt động bằng cách cử động các cơ của ruột. Phân đầu tiên: Khi đường tiêu hóa bắt đầu hoạt động, con của mẹ học cách nuốt nước ối. Tuy nhiên, chất lỏng này không hoàn toàn sạch và có chứa một số mảnh mô nhỏ. Qua thời gian, chất thải này tích tụ bên trong ruột của thai nhi và sau khi bé được chào đời, chất thải này sẽ trở thành phân đầu tiên, một chất nhầy màu đen gọi là phân su. Các hợp chất khác mà con của mẹ nuốt vào được chuyển trở lại hệ tuần hoàn máu của mẹ bằng cách đi qua màng nhau. Sự di chuyển của ruột: Ở tuần thứ 8, ruột của con của mẹ đã phát triển ra khỏi khoang ổ bụng và trở thành một phần của dây rốn. Tuần này, ruột đang di chuyển trở lại ở trong ổ bụng nơi chúng sẽ ở lại đây mãi mãi. Móng tay: Trên những ngón tay nhỏ bé của con của mẹ , những chiếc móng nhỏ bắt đầu phát triển.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Khi mẹ đã trải qua tam cá nguyệt đầu tiên, các triệu chứng trước đây của mẹ có thể bị thay thế bởi các triệu chứng mới. Mặc dù bây giờ mẹ có thể đi tiểu ít hơn nhưng sau đó nó sẽ tăng trở lại. Tiết dịch âm đạo: Có thể mẹ sẽ bị tăng dịch tiết âm đạo nhưng không cần phải lo lắng. Đó là điều bình thường và giúp con của mẹ ngăn ngừa nhiễm trùng. Táo bón: Không phải tất cả phụ nữ đều bị táo bón nhưng tình trạng này khá phổ biến và có thể làm cho mẹ cảm thấy khó chịu. Mẹ có thể cảm thấy đau bụng hoặc đau quặn bụng. Nếu mẹ bị đau bụng không tự giảm đi, trở nên nghiêm trọng hoặc kèm theo chảy máu âm đạo hoặc các triệu chứng khác, mẹ cần phải gặp nữ hộ sinh hoặc bác sĩ. Trào ngược dạ dày thực quản: Mẹ có thể bị trào ngược dạ dày thực quản. Nguyên nhân là do dạ dày của mẹ khó tiêu hóa thức ăn cay, béo và nhiều dầu mỡ. Đó thường là kết quả của các hormone khiến các cơ trong dạ dày giãn ra để giúp việc sinh nở dễ dàng hơn. Tử cung ngày càng lớn sẽ càng ép dạ dày của mẹ và đẩy axit dạ dày trào ngược vào thực quản. Thêm vào đó, mẹ có thể gặp các triệu chứng sau: đau đầu, tiết nhiều nước bọt, đầy hơi, khứu giác tăng cao.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm' },
      {
        type: 'paragraph',
        text: 'Giảm lượng thức ăn trong mỗi bữa ăn, bù lại bằng việc ăn nhiều bữa hơn và ăn chậm rãi. Uống đủ nước. Cung cấp cho cơ thể thực phẩm có lợi, bao gồm rau và trái cây tươi, đó là cách tốt nhất để chống lại trào ngược dạ dày thực quản. Trong khi mang thai mẹ nên lưu ý rằng mẹ cần thêm khoảng 300 calo mỗi ngày, bằng khoảng 2 quả bơ nhỏ hoặc 2kg dưa chuột.',
      },
    ],
  },
  {
    week: 13,
    title: 'Tuần thứ 13 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Xương của con của mẹ đang trở nên chắc khỏe hơn và mẹ có thể bắt đầu nhận thấy nhiều triệu chứng hơn trong tam cá nguyệt thứ 2 như táo bón, thèm ăn,',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'con của mẹ nặng khoảng 25g và kích thước dài khoảng 7.5cm – bằng kích thước của một hạt đậu hà lan. Sự phát triển của phần dưới cơ thể đang theo kịp với sự phát triển của phần đầu, vì vậy thai nhi giờ đây trông giống một con người thực sự. Giọng nói: Các dây âm thanh đang được hình thành trong tuần này. Chúng được tạo nên từ các nếp gấp của mô trong vùng hầu họng và tạo ra âm thanh qua việc phát âm. Xương: Xương của con của mẹ giờ đây đã trở nên cứng hơn, đặc biệt xương đầu và các xương dài. Các cơ của thành ngực cũng đang bắt đầu phát triển. Sự hình thành nước tiểu: Vào đầu tuần này, thận của con của mẹ bắt đầu hoạt động. Một khi có thể nuốt nước ối, bé sẽ bài tiết một dạng nước như nước tiểu vào trong nước ối. Lượng nước thừa trong máu của con của mẹ sẽ bài tiết qua thận dưới dạng nước tiểu. Lượng nước tiểu sẽ từ từ tăng lên vào những tuần sau của thai kỳ, khoảng nửa lít được bài tiết vào túi ối hàng ngày. Ruột: Ruột hoàn thành quá trình di chuyển từ dây rốn vào bên trong cái bụng nhỏ của con của mẹ . Hormone: Sự tập trung của i-ốt, một yếu tố thiết yếu cho việc sản xuất hormone tuyến giáp, có thể được phát hiện ngay lúc này. Điều này có nghĩa là lúc này tuyến giáp bắt đầu tổng hợp các hormone cốt yếu cho sự tăng trưởng và phát triển não của con của mẹ .',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Một đặc điểm chung của tuần thứ 13 là ham muốn tình dục tăng cao. Quan hệ tình dục khi mang thai là bình thường và an toàn trừ khi bác sĩ khuyên không nên và đề nghị nghỉ ngơi hoàn toàn đối với vùng chậu trong các tình trạng bất thường như nhau tiền đạo. Đường sọc nâu: Mẹ có thể bắt đầu nhìn thấy một đường thẳng đứng sẫm màu nhẹ chạy từ xương mu đến xương ức – đường sọc nâu. Mẹ không thể ngăn đường sọc nâu xuất hiện vì đây là hiện tượng tự nhiên trong thai kỳ. Thường thì đường sọc nâu sẽ nhạt đi dần ngay sau khi sinh. Tiết dịch âm đạo màu trắng: Mẹ có thể bị tăng tiết dịch âm đạo, đặc biệt là khí hư hay dịch tiết màu trắng giúp chống lại nhiễm trùng cho âm đạo. Mẹ không thể làm gì để ngăn dịch tiết ra, vì vậy đừng lo lắng hay mất ngủ vì nó, trừ khi mẹ cảm thấy khó chịu hoặc ngứa hoặc khí hư có mùi hôi. Để đảm bảo sự thoải mái của mẹ, có thể dùng băng vệ sinh hàng ngày. Mẹ nên tránh sử dụng băng vệ sinh tampon vì chúng có thể dẫn đến nhiễm trùng.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm' },
      {
        type: 'paragraph',
        text: 'Duy trì chế độ dinh dưỡng lành mạnh và luôn nhớ bổ sung vitamin tổng hợp trước sinh nếu mẹ không chắc chắn rằng mình được cung cấp đủ các vitamin cũng như khoáng chất bằng con đường ăn uống và hấp thu tự nhiên. Nếu cơ thể mẹ không đủ dinh dưỡng hoặc thậm chí suy dinh dưỡng, sinh lý của con của mẹ sẽ thích nghi với những gì sẵn có. Nghiên cứu cho thấy rằng nếu trẻ em bị suy dinh dưỡng khi còn trong bụng mẹ, chúng sẽ có nguy cơ đối mặt với các vấn đề về sức khỏe như béo phì, bệnh tim và đái tháo đường trong tương lai.',
      },
    ],
  },
  {
    week: 14,
    title: 'Tuần thứ 14 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Chào mừng mẹ đến với tam cá nguyệt thứ 2. Hệ thống miễn dịch của con của mẹ bắt đầu hình thành, mặc dù có thể mất vài năm nữa để hoàn thiện.',
      },
      {
        type: 'paragraph',
        text: 'Đối với mẹ, một số triệu chứng trong thai kỳ có thể sẽ thay đổi. Cảm giác mệt mỏi và ốm nghén có thể giảm bớt, mẹ có thể bị chuột rút ở chân và đau dây chằng.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'con của mẹ đang lớn nhanh, dài khoảng 8cm – kích thước bằng một quả chanh – và nặng khoảng 45g. Giới tính của con của mẹ đã phát triển đầy đủ nhưng vẫn có thể khó xác định trong tuần này. Lông của em bé: con của mẹ đang hình thành lông măng, một loại lông tơ rất mỏng, nhẹ và không có sắc tố bao phủ khắp cơ thể nhỏ bé. Lông măng là loại lông đầu tiên được sản xuất bởi các nang lông của con của mẹ giúp bảo vệ làn da nhạy cảm. Khi con của mẹ tích mỡ giữ nhiệt trong vài tháng tới, lông măng sẽ tự rụng. Đôi khi, vẫn còn thấy một chút lông măng mềm này sau sinh. Vào cuối tuần này, lông mày của con của mẹ cũng sẽ bắt đầu mọc. Lá lách: Vào cuối tuần này gan giảm dần tốc độ tạo hồng cầu và lá lách bắt đầu vai trò này. Vì vậy, lá lách lúc này trở thành nơi sản xuất hồng cầu chính. Gan: Các tế bào gan bắt đầu sản xuất axit mật, chất này sẽ cần thiết cho quá trình tiêu hóa nhưng hiện tại nó giúp điều chỉnh sự hình thành mạch máu và tái tạo động mạch gan. Sau một vài tuần, mật sẽ đi vào tá tràng, phần đầu tiên của ruột non. Ở đó, mật sẽ trộn với phân su, phân đầu tiên của con của mẹ sẽ có màu xanh oliu đậm. Hệ thống miễn dịch: con của mẹ chỉ tạo ra một lượng nhỏ kháng thể do hệ thống miễn dịch chưa trưởng thành. Một số miễn dịch thụ động được truyền cho thai nhi từ mẹ qua nhau thai – các kháng thể của mẹ truyền cho thai nhi có khả năng miễn dịch đối với một số bệnh như bệnh bạch hầu, bệnh đậu mùa và bệnh sởi. Tuy nhiên, quá trình này không có bao gồm miễn dịch chống lại bệnh ho gà hoặc thủy đậu. Mặc dù lá lách của con của mẹ đang cung cấp một số chức năng miễn dịch nhất định nhưng khả năng miễn dịch vẫn còn rất mỏng manh.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Tam cá nguyệt thứ 2 thường được gọi là “ thời kỳ vàng” vì nhiều ảnh hưởng khó chịu của lúc mới mang thai đã biến mất lúc này mẹ có thể ít buồn nôn hơn, ngủ tốt hơn và nhiều năng lượng hơn. Tuy nhiên, mẹ có thể gặp một số triệu chứng mới như đau lưng, chuột rút ở chân, táo bón, trào ngược dạ dày thực quản và đau dây chằng tròn. Đau dây chằng tròn: Đau dây chằng tròn xảy ra khi tử cung của mẹ ngày càng lớn làm tăng áp lực lên dây chằng, kết quả là mẹ thường bị đau nhói ở vùng bụng dưới. Ngực của mẹ sẽ tiếp tục to lên nhưng mẹ có thể cảm thấy bớt đau hơn. Ngoài ra, sự mệt mỏi và nhu cầu đi tiểu cũng ít hơn.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm' },
      {
        type: 'paragraph',
        text: 'Khi bị đau dây chằng tròn, tránh vận động đột ngột. Tập thể dục để tăng cường các cơ cốt lõi có thể giúp tránh các triệu chứng về lâu dài.',
      },
    ],
  },
  {
    week: 15,
    title: 'Tuần thứ 15 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Khuôn mặt của con của mẹ bắt đầu giống như một em bé đáng yêu. Do lượng máu của mẹ tăng lên, mẹ có thể bị nghẹt mũi hoặc thậm chí chảy máu cam.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này con của mẹ nặng khoảng 70g và dài khoảng 10cm – bằng kích thước của một quả táo đỏ. Trái tim nhỏ bé giờ có thể bơm khoảng 25 lít máu mỗi ngày và mái tóc mỏng đang được hình thành trên da đầu. Xương: Lúc này bé có thể cử động đầu gối và khủy tay, mặc dù khung xương vẫn còn đang tiếp tục phát triển và không phải tất cả các xương đều đã được hình thành. Khi xương trở nên chắc khỏe hơn, mật độ của chúng tăng lên và chúng sẽ hiển thị trên hình chụp X-quang vào tuần này. Nhưng trên siêu âm, chúng có thể được nhìn thấy sau 1 tuần nữa. Đôi mắt nhỏ: Đôi mắt của con của mẹ đang di chuyển từ hai bên đầu đến phía trước khuôn mặt. Tại thời điểm này, mắt vẫn còn nhạy cảm với ánh sáng và vì vậy lúc này con của mẹ vẫn nhắm mắt. Phổi: con của mẹ tiếp tục hít nước ối. Khi nước ối đi vào đường hô hấp, nó giúp phổi phát triển các túi khí cần để hít thở không khí và lấy khí oxy. Bộ phận sinh dục: Đối với bé gái, buồng trứng đã được hình thành đầy đủ và đang di chuyển từ bụng vào vùng chậu. Hàng trăm ngàn quả trứng hiện đang phát triển trong trong các buồng trứng đó. Nếu con của mẹ là một bé trai, tinh hoàn hiện đã được hoàn hiện đầy đủ.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Lượng máu của mẹ tăng lên và hệ thống tuần hoàn lưu thông nhiều máu hơn để mẹ có thể cung cấp cho con của mẹ đủ các chất dinh dưỡng cần thiết. Các triệu chứng mới: Do lưu lượng máu tăng lên, mẹ có thể xuất hiện các triệu chứng mới như nghẹt mũi, chảy máu cam, nướu sưng đỏ trong vài tháng tới. Vấn đề về hô hấp: Mẹ có thể phát triển một số vấn đề về hô hấp. Nếu mẹ bị dị ứng thời tiết, chúng có thể trở nên nghiêm trọng hơn trong thai kỳ. Da sáng hơn: Một số phụ nữ có thể có da sáng hơn khi mang thai, khiến họ trông xinh đẹp hơn. Điều này một phần là do sự thay đổi nội tiết và tăng lưu lượng máu.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm lúc này' },
      {
        type: 'paragraph',
        text: 'Đến giờ, mẹ có thể đã tăng khoảng #số kg và vẫn còn tăng thêm nhiều hơn nữa. Mẹ có thể bắt đầu tìm cách mặc quần áo thoải mái hơn và tiếp tục theo dõi cân nặng của mình để đảm bảo cân nặng ở mức khỏe mạnh. Để tránh một số vấn đề về hô hấp hoặc nghẹt mũi, mẹ có thể nên tránh nơi nhiều bụi, thuốc phun hay khí dung và bất cứ hình thức hít khói thuốc thụ động nào.',
      },
    ],
  },
  {
    week: 16,
    title: 'Tuần thứ 16 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ đang phát triển rất nhanh và di chuyển rất nhiều. Sự gia tăng lưu lượng máu qua cơ thể đang chuẩn bị để mẹ cho con bú.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Đôi mắt của con của mẹ có thể di chuyển từ từ và bé nặng khoảng 100g và dài khoảng 12cm – bằng kích thước của một quả cà chua. Các cú đạp: Lúc này mẹ có thể cảm nhận được cú đạp đầu tiên của con của mẹ . Tuy nhiên, nếu đây là lần mang thai đầu tiên thì vẫn còn vài tuần nữa để mẹ có thể cảm nhận được cú đạp đầu tiên của con của mẹ . Vì vậy, mẹ đừng lo lắng nếu mẹ chưa cảm thấy gì. Điều này là hoàn toàn bình thường. Tư thế: Xương sống và cơ lưng đang ngày càng chắc khỏe giúp con của mẹ có thể duỗi thẳng đầu và cổ. Đôi tai: Đôi tai đã di chuyển sang hai bên đầu trong vài tuần qua và giờ sắp đến vị trí cuối cùng. Chân và các ngón chân: Đôi chân của con của mẹ lúc này đã hoàn thành quá trình phát triển. Các chuyển động được phối hợp tốt hơn nhưng những chuyển động này vẫn còn quá yếu để mẹ cảm nhận được. Ở trên các đầu ngón chân, những chiếc móng nhỏ xinh đang dần hình thành. Trái tim: Do hệ thống tuần hoàn đã được thiết lập, tim của con của mẹ khỏe hơn bao giờ hết và lúc này có thể bơm khoảng 20 lít máu mỗi ngày. Da trong suốt: Tại thời điểm này, da của bé vẫn chưa có mỡ, điều đó có nghĩa là da của con của mẹ hầu như là trong suốt và chúng ta có thể nhìn thấy các mạch máu dưới lớp da mỏng đó. Các cơ: Các cơ biểu cảm trên khuôn mặt được hình thành nhưng sẽ mất vài tuần để thấy nụ cười của con của mẹ .',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Sự gia tăng lưu lượng máu đang chuẩn bị để mẹ cho con bú sau này. Thế nhưng điều này có thể gây nghẹt mũi và tăng tiết dịch âm đạo. Táo bón: Mẹ có thể bị táo bón vì hormone progesterone làm giãn các cơ trơn của cơ thể bao gồm các mô của ruột. Hệ lụy là tiêu hóa và nhu động ruột chậm lại dẫn đến đầy hơi, chướng bụng và ợ hơi. Đau lưng: Lưng của mẹ sẽ có thể sớm bị đau bởi vì thai nhi ngày càng lớn có thể thay đổi trọng tâm và làm căng lưng của mẹ. Thật không may là mẹ cũng chưa thể làm gì nhiều để đỡ đau lưng và mẹ có thể phải chờ đến sau khi sinh để cơn đau tự biến mất. Tuy nhiên, sử dụng gối dành cho mẹ bầu khi ngủ có thể rất hữu ích.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm' },
      {
        type: 'paragraph',
        text: 'Nếu mẹ bị táo bón, đảm bảo rằng mẹ uống đủ nước và ăn thực phẩm giàu chất xơ. Để giảm các vấn đề về dạ dày, tốt hơn hết mẹ nên giảm tiêu thụ các loại thực phẩm làm cho tình trạng xấu đi như bắp cải và đậu. Theo dõi cân nặng: Điều quan trọng là mẹ phải biết cần tăng bao nhiêu và khi nào tăng. Cho tới giờ mẹ nên tăng #số kg kg dựa trên chỉ số BMI của mình. Mẹ có thể thử học cách tính chỉ số khối cơ thể BMI, đây là bước làm đầu tiên để xác định mức tăng của mẹ. Ăn uống lành mạnh: Miễn là mẹ có một chế độ ăn lành mạnh – giảm tối đa đồ ăn nhanh và tối đa hóa thực phẩm giàu dinh dưỡng – về lâu dài sẽ có lợi cho sức khỏe.',
      },
    ],
  },
  {
    week: 17,
    title: 'Tuần thứ 17 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Tuần này đánh dấu lần đầu tiên thai nhi lớn hơn nhau thai. Mẹ có thể cảm thấy đổ mồ hôi nhiều hơn bình thường.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Bây giờ con của mẹ dài khoảng 13 cm và nặng khoảng 140g – bằng kích thước của một củ hành tây. Trái tim bé nhỏ thời gian này đập khoảng 150 lần mỗi phút. Bộ não: Bộ não tiếp tục phát triển các giác quan bao gồm thị giác, khứu giác, thính giác và xúc giác. Hầu hết các phản xạ sinh tồn mà bé có được khi chào đời cũng được hoàn thiện trong tử cung lúc này. Trái tim: Nhịp tim của con của mẹ đập khoảng 150 lần mỗi phút và bơm khoảng 47 lít máu mỗi ngày. Giờ đây nhịp tim được điều khiển hoàn toàn bởi bộ não. Chuyển động của thai nhi: con của mẹ đang bắt đầu hoạt động tích cực hơn trong túi ối – bao gồm các chuyển động lăn tròn và nhào lộn. Lượng đường trong máu: Tuyến tụy hoạt động tốt hơn trong tuần này và glucagon, một trong những hormone do tuyến tụy sản xuất hiện có thể được phát hiện trong huyết tương. Cùng với insulin đã bắt đầu được sản xuất từ khoảng một tháng trước, glucagon giúp điều chỉnh lượng đường trong máu.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Khi thai nhi ngày càng phát triển và ngày càng lớn hơn, mẹ có thể nhận thấy các vết rạn da. Có tới 90% phụ nữ có các vết rạn này, chúng có màu hồng, đỏ, vàng, rám nắng hoặc đôi khi màu nâu. Mẹ sẽ có thể nhận thấy chúng ở quanh bụng, mông, đùi, hông hoặc bầu ngực của mình. Các giấc mơ: Do những thay đổi trong giấc ngủ, mẹ có thể bắt đầu trải qua những giấc mơ kỳ lạ. Nếu mẹ thường xuyên thức giấc vào ban đêm, mẹ có thể nhớ được các giấc mơ hơn là thức dậy nếu ngủ tới sáng. Mồ hôi lòng bàn tay: Do sự gia tăng tuần hoàn máu, mẹ có thể đổ mồ hôi nhiều hơn bình thường. Đây là một lý do khác để mẹ tránh các căng thẳng và thấy thoải mái hơn.',
      },
      { type: 'heading', text: 'Làm gì trong thời gian này' },
      {
        type: 'paragraph',
        text: 'Để hỗ trợ quá trình hình thành xương của con của mẹ , mẹ cần đảm bảo bổ sung đủ canxi, magie, sắt và vitamin. Nằm ngủ nghiêng bên trái: Để giảm áp lực tử cung tác động lên các mạch máu vùng bụng, mẹ hãy cố gắng nằm nghiêng sang bên trái thay vì nằm ngửa. Giảm vết rạn da: Mẹ có thể cố gắng giảm thiếu vết rạn da bằng cách đảm bảo không tăng cân quá nhiều – ăn cho hai người không có nghĩa là ăn gấp đôi. Ngoài ra cũng có một số phụ nữ tin rằng nuôi dưỡng làn da từ bên trong bằng cách bổ sung nhiều thực phẩm giàu vitamin C có thể có ích. Các loại kem và chất dưỡng ẩm không thể loại bỏ các vết rạn da nhưng mẹ có thể che phủ chúng bằng cách thoa kem hoặc phơi làm da rám nắng để làm mờ đi các vết rạn này.',
      },
    ],
  },
  {
    week: 18,
    title: 'Tuần thứ 18 của thai kỳ',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ lúc này có thể nghe thấy giọng nói của mẹ! Thông qua ống nghe, mẹ cũng có thể nghe thấy nhịp tim của con của mẹ .',
      },
      {
        type: 'paragraph',
        text: 'Mẹ có thể cảm thấy hơi mệt mỏi vì đang trong thời kỳ đỉnh điểm của tình trạng huyết áp thấp. Vào những lúc cảm thấy tràn đầy năng lượng, mẹ có thể bắt đầu trò chuyện với con của mẹ hoặc đọc cho bé một vài mẩu chuyện.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này con của mẹ nặng khoảng 200g và dài khoảng 15cm – bằng kích thước của một quả ớt chuông. Các dây thần kinh và não: Các dây thần kinh đang bắt đầu phát triển lớp màng myelin, một chất bao phủ và cách ly các tế bào thần kinh để giúp chúng hoạt động tốt hơn. Myelin là chìa khóa cho sự phát triển trí não của con của mẹ . Đôi tai: Đôi tai bắt đầu nhô ra hai bên đầu. Ở giai đoạn này, con của mẹ có thể đã bắt đầu nghe nhưng chưa thể phân biệt được các giọng nói khác nhau. Khuôn mặt: Đôi mắt và khuôn mặt bắt đầu hướng về phía trước nhiều hơn, vì vậy lúc này con của mẹ đã trông giống con người hơn. Xương: Bắt đầu từ tuần này, những chiếc xương nhỏ của con của mẹ có thể nhìn thấy rõ trên hình ảnh siêu âm. Cơ quan sinh sản: Buồng trứng và tinh hoàn có cấu trúc khác nhau nhưng cả hai đều mang các nang nguyên thủy bên trong. Trong những túi nhỏ này là những tế bào nhỏ li ti được gọi là noãn bào hoặc tế bào sinh dục nguyên thủy. Sau đó, những tế bào này sẽ phân chia và cuối cùng trở thành tế bào trứng hoặc tinh trùng – từ đây sẽ tạo nên các cháu của mẹ sau này. Phổi: Vào tuần này, tất cả các thành phần thiết yếu của phổi đã hình thành, ngoại trừ những phần tham gia vào quá trình trao đổi khí. Do không thể tự hô hấp, thai nhi sinh ra trong giai đoạn này không có khả năng sống sót.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Một trong những triệu chứng thường gặp ở giai đoạn này là huyết áp thấp vì sức tải của hệ tuần hoàn tăng lên đáng kể để đáp ứng nhu cầu tuần hoàn của thai kỳ. Nói chung, huyết áp thấp đạt đỉnh vào khoảng giữa tam cá nguyệt thứ hai và sau đó cải thiện dần. Đau bụng: Đau bụng khi mang thai là triệu chứng thường gặp và có thể do táo bón, đầy hơi hoặc “cơn đau tăng dần lên” do căng dây chằng để hỗ trợ tử cung ngày càng lớn dần của mẹ. Mẹ không cần phải lo lắng nếu cơn đau nhẹ và biến mất khi mẹ thay đổi tư thế, nghỉ ngơi, đi vệ sinh, đi đại tiện hoặc xì hơi. Tuy nhiên, đôi khi đau bụng có thể là dấu hiệu của một vấn đề nào đó nghiêm trọng. Nếu mẹ bị đau bụng dai dẳng (cơn đau không biến mất) hoặc đau quặn hoặc nếu cơn đau đột ngột, mẹ nên được thăm khám bởi bác sĩ hoặc nữ hộ sinh ngay lập tức. Đau đầu: Một số sản phụ bị đau đầu trong thai kỳ. Những cơn đau đầu không thường xuyên rất thường gặp và không đáng lo ngại trừ khi đó là những cơn đau nghiêm trọng, lặp lại theo kiểu mẫu hoặc đều đặn.',
      },
      { type: 'heading', text: 'Những điều mẹ nên làm' },
      {
        type: 'paragraph',
        text: 'Để hỗ trợ sự phát triển trí não của con của mẹ , mẹ hãy bổ sung nhiều thực phẩm giàu omega-3 vào chế độ ăn uống. Tốt nhất mẹ nên ăn cá hồi, cá ngừ đóng hộp hoặc các loại cá nhỏ vì chúng thường chứa ít hàm lượng thủy ngân. Vì mẹ có thể trong tình trạng huyết áp thấp, nên di chuyển chậm lại một chút để cơ thể bắt kịp nhịp độ. Đừng đứng dậy quá nhanh sau khi đọc bài viết này.',
      },
    ],
  },
  {
    week: 19,
    title: 'Tuần thai kỳ thứ 19',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ phát triển một lớp nhầy bao phủ giúp ích cho quá trình sinh thường và có lợi trong những giờ đầu tiên sau sinh.',
      },
      {
        type: 'paragraph',
        text: 'Mẹ có thể bị chuột rút ở chân và các mảng da sẫm màu trên mặt.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Con của mẹ lúc này dài khoảng 15cm, bằng kích thước của một quả cà chua và nặng khoảng 240g. Lớp phủ bảo vệ: Da của con của mẹ bắt đầu được bảo vệ từ đầu đến chân bằng một chất nhầy màu trắng gọi là vernix caseosa hay chất gây. Lớp chất gây này giúp dưỡng ẩm làn da của con của mẹ khi ở trong tử cung, bảo vệ da khỏi nước ối và đồng thời hoạt động như một chất bôi trơn tự nhiên giúp bé qua âm đạo dễ dàng khi sinh. Ngay cả sau khi sinh, lớp chất gây có thể tiếp tục bảo vệ làn da của bé bằng cách giúp giữ ẩm và ngăn ngừa nhiễm trùng do vi khuẩn. Đây là lý do tại sao không nên tắm ngay cho bé sau sinh và Tổ chức Y Tế Thế Giới (WHO) khuyến nghị nên đợi ít nhất 6 giờ. Cánh tay và chân: con của mẹ đã trông giống người hơn vì cánh tay và chân đã cân đối với phần còn lại của cơ thể. Nhiều liên kết thần kinh hơn: Tế bào thần kinh tạo ra nhiều liên kết hơn với các cơ, cho phép con của mẹ kiểm soát các cánh tay và chân tốt hơn.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Trọng lượng cơ thể tăng có thể dẫn đến các vết rạn da ở chân và bụng, mẹ có thể bị đau lưng nhiều hơn và các triệu chứng khác. Nám da: Mẹ có thể bắt đầu nhận thấy các mảng da sẫm màu trên mặt hoặc những nơi khác, được gọi là nám da hoặc “mặt nạ của thai kỳ”. Thông thường các mảng này không ảnh hưởng gì đến sức khỏe của mẹ hoặc con của mẹ và nó sẽ tự mờ đi sau sinh. Chuột rút chân: Chuột rút chân thường gặp trong thai kỳ, thường xảy ra vào ban đêm. Để ngăn ngừa chuột rút, hãy căng cơ bắp chân trước khi đi ngủ, năng động và uống đủ nước. Trong trường hợp xảy ra chuột rút, hãy duỗi căng cẳng chân đang chịu ảnh hưởng. Tắm nước nóng, nước ấm hoặc mát-xa bằng nước đá cũng có thể hữu ích.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm lúc này' },
      {
        type: 'paragraph',
        text: 'Để giảm bớt ảnh hưởng của áp lực do thai gây ra, giảm đau lưng và hông, hãy cố gắng nằm nghiêng khi ngủ và kê một chiếc gối giữa hai đầu gối. Điều trị nám: Nếu mẹ muốn điều trị nám vì lý do thẩm mỹ, hãy xác minh tính an toàn của bất kỳ phương pháp điều trị nào với bác sĩ da liễu, dược sĩ hoặc bác sĩ của mẹ. Lưu ý rằng nhiều loại kem bôi hoặc thuốc được quảng cáo nhằm giảm các mảng da sẫm tốt nhất đều có thể không hiệu quả và không an toàn. Tìm hiểu về các quy trình chăm sóc trẻ sơ sinh: Tắm ngay cho bé sau khi sinh là một quy trình phổ biến. Nhưng ngày càng có nhiều bệnh viện thay đổi cách làm đó do nhận ra lợi ích sức khỏe của lớp chất gây, một lớp nhầy trắng thường bao phủ trẻ sau sinh. Mẹ có thể trao đổi với bệnh viện của mình để biết quy trình chăm sóc trẻ ngay sau sinh đang được thực hiện và liệu họ có đợi qua một giờ đầu tiên để tắm cho bé sau sinh hay không.',
      },
    ],
  },
  {
    week: 20,
    title: 'Tuần thai kỳ thứ 20',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Tuần thai kỳ thứ 20 là một cột mốc quan trọng vì mẹ và con của mẹ đã đi được nửa chặng đường.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này con của mẹ nặng khoảng 300g và dài khoảng 25cm – kích thước bằng một quả chuối. Giấc ngủ: Giờ con của mẹ đã phát triển các giấc ngủ theo chu kỳ đều đặn. Tuy nhiên, bé có thể bị đánh thức bởi những tiếng động lớn, chuyển động của mẹ hoặc khi mẹ ăn hay uống thứ gì đó. Cử động thai: Nếu đây là lần đầu tiên mang thai của mẹ, mẹ có thể cảm thấy con của mẹ chuyển động, đấm hoặc đá lần đầu tiên vào tuần này. Không có số lần chuyển động cụ thể của bé mà mẹ có thể cảm nhận được ở thời điểm này. Điều quan trọng là mẹ nên biết cách thức chuyển động của bé. Kể từ nay cho đến khi sinh, mẹ sẽ luôn cảm nhận được cảm giác này. Cơ quan sinh dục: Nếu mẹ mong đợi một bé gái, tử cung của bé đã được hình thành đầy đủ trong tuần này và ống âm đạo đang bắt đầu phát triển. Đến giờ, một bé gái có thể cũng sẽ có hơn bảy triệu quả trứng trong buồng trứng. Nếu mẹ có một bé trai, hai tinh hoàn của bé vẫn còn đang ở trong bụng. Trong khoảng 5-15 tuần tiếp theo, chúng sẽ dần dần đi xuống bìu qua một cấu trúc dạng ống. Tuy nhiên, khoảng 2-4% bé trai sinh đủ tháng có một tinh hoàn chưa xuống bìu khi sinh. Tiết nước bọt: Hai tuyến mang tai hiện diện ở hai bên miệng và trước hai tai bắt đầu hoạt động trong tuần này. Cùng với hai tuyến nhỏ khác, tuyến mang tai sẽ sớm sản xuất nước bọt. Nước bọt, hơn 98% là nước và chứa nhiều chất quan trọng bao gồm chất điện giải, enzym và các hợp chất kháng khuẩn sẽ góp phần giúp con của mẹ tiêu hóa thức ăn và duy trì vệ sinh răng miệng.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Ở giai đoạn này, tóc của mẹ có thể dày lên và móng tay có thể cứng lại. Đôi khi, lông mọc ở những nơi mẹ không ngờ tới. Thông thường, những loại lông này sẽ biến mất sau sinh. Vấn đề về hô hấp: Tử cung đang lớn dần của mẹ có thể đẩy phổi lên dẫn đến khó thở và các vấn đề hô hấp khác.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm lúc này' },
      {
        type: 'paragraph',
        text: 'Mẹ có thể muốn ăn mừng nửa chặng đường với bố hoặc bạn bè và gia đình của con của mẹ .',
      },
    ],
  },
  {
    week: 21,
    title: 'Tuần thai kỳ thứ 21',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ lúc này có thể mút ngón tay cái, mẹ có thể phù nhiều hơn và có thể gặp các vấn đề về nướu.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'con của mẹ nặng khoảng 360g và dài khoảng 27cm – kích thước bằng một củ cà rốt. Nhau thai: Trong các tuần trước, nhau thai nặng hơn trọng lượng cơ thể của con của mẹ thì khoảng từ tuần này trở đi, con của mẹ sẽ nặng hơn nhau thai. Phản xạ mút: Phản xạ mút cũng đang phát triển, cho phép bé mút ngón tay cái. Trên hình ảnh siêu âm mẹ có thể may mắn được nhìn thấy điều này từ bây giờ trở đi. Lông măng: Cơ thể của {{ NAME }] đã được bao phủ hoàn toàn bởi một lớp lông mịn, mềm được gọi là lông măng. Lông măng giúp giữ lớp chất nhầy trên da và thường tự rụng sau khi bé chào đời. Lớp nhầy bảo vệ da: Da vẫn đang được bao phủ bởi một lớp chất nhầy hay chất gây – chất bảo vệ bao phủ da bé cho đến khi chào đời.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Mẹ có thể tiếp tục trải qua các triệu chứng như đau lưng, phù và có thể bị chảy máu nướu. Nướu và viêm nướu: Sự thay đổi nội tiết tố có thể làm mẹ dễ bị ảnh hưởng bởi các mảng bám. Chúng có thể gây viêm và chảy máu răng, hay còn được gọi là viêm nướu. Tình trạng này làm tăng nguy cơ bị nhiễm trùng và có thể ảnh hưởng đến sức khỏe của thai nhi đang phát triển. Điều quan trọng là mẹ nên đánh răng thường xuyên và vệ sinh răng miệng tốt. Phù chân: Mẹ có thể nhận thấy hai chân và bàn chân bị sưng to, đặc biệt vào buổi tối. Triệu chứng này còn được gọi là phù nề và có xu hướng nghiêm trọng hơn ở giai đoạn này. Tình trạng này xảy ra khi các mạch máu nhỏ rò rỉ dịch vào các mô lân cận.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Điều quan trọng là giữ cho răng và nướu sạch sẽ và khỏe mạnh trong thai kỳ. Cách tốt nhất để phòng tránh hoặc ngăn ngừa các vấn đề về nướu là hãy vệ sinh răng miệng tốt như đánh răng thường xuyên. Hẹn khám nha sĩ: Hẹn khám nha sĩ ít nhất một lần trong khi mang thai càng sớm càng tốt. Một số phòng khám nha khoa không nhận điều trị cho phụ nữ mang thai trong giai đoạn sau của thai kỳ vì thủ thuật có thể gây chuyển dạ. Khi mẹ đến khám nha sĩ, hãy đảm bảo rằng nha sĩ biết mẹ đang mang thai – một số trường hợp nha sĩ có thể yêu cầu giấy chứng nhận sức khỏe từ bác sĩ sản khoa của mẹ. Một số phương pháp điều trị như loại bỏ chất trám amalgam không được khuyến nghị điều trị trong thai kỳ.',
      },
    ],
  },
  {
    week: 22,
    title: 'Tuần thai kỳ thứ 22',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ lúc này ngủ khoảng 14 tiếng một ngày và dành thời gian còn lại để thức và tập các chuyển động mới. Mẹ có thể bắt đầu nhận thấy đau ở hậu',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này con của mẹ nặng khoảng 430g và dài khoảng 28cm – kích thước bằng một quả xoài Thái. Ở giai đoạn này, con của mẹ đang học thêm các kỹ năng vận động tinh và cố gắng sờ vào cơ thể, mặt và dây rốn. Đôi mắt: Đôi mắt tiếp tục hình thành nhưng vẫn chưa phát triển sắc tố mống mắt để tạo nên màu cho đôi mắt. Tóc: Có thể nhìn thấy tóc của con của mẹ mọc trên da đầu theo dạng nhất định và sẽ ở đó mãi mãi. Lúc này cũng có thể nhìn thấy được lông mày và lông mi. Chất béo: Mỡ nâu hay còn gọi là mô mỡ bắt đầu hình thành. Loại chất béo này bảo vệ con của mẹ khỏi bị hạ thân nhiệt. Trẻ sơ sinh dễ bị mất nhiệt hơn người lớn, vì vậy hạ thân nhiệt có thể là một vấn đề nghiêm trọng, đặc biệt đối với trẻ sinh non. Nội tiết tố: Tuyến giáp bắt đầu hoạt động từ vài tuần trước. Hormone tuyến giáp rất cần thiết cho sự phát triển bình thường của con của mẹ trước và sau khi sinh. Các hormone như thyroxine, điều chỉnh tốc độ trao đổi chất của cơ thể và ảnh hưởng đến tim, chức năng cơ và sự phát triển của não. Trong tuần này, nồng độ hormone kích thích tuyến giáp và thyroxine bắt đầu tăng lên và cuối cùng sẽ đạt đến mức của người trưởng thành ở tuần thứ 37. Bộ phận sinh dục: Đối với bé trai, tinh hoàn sẽ bắt đầu di chuyển xuống.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Mẹ vẫn có thể bị trào ngược dạ dày thực quản và có thể nhận thấy tay và chân phù nhiều hơn. Lồi rốn: Rốn của mẹ có thể bị lồi ra ngoài và mẹ có thể cảm thấy khi nó bị cọ vào quần áo. Mẹ không cần phải lo lắng vì nó sẽ tự trở lại bình thường sau sinh. Bệnh trĩ: Mẹ có thể bị trĩ gây đau ở hậu môn. Những khối phồng này ở bên trong hoặc xung quanh hậu môn và trực tràng, thường gây cảm giác ngứa và đau khi đi đại tiện. Thỉnh thoảng mẹ cũng có thể cảm thấy có những đốm máu hoặc tiết chất nhầy. Bệnh trĩ có thể xảy ra với bất cứ ai, nhưng sẽ thường có nguy cơ xuất hiện cao hơn trong thai kỳ. Đó là do hormone thai kỳ, hormone progesterone làm giãn thành mạch máu và khiến chúng sưng lên.',
      },
      { type: 'heading', text: 'Những điều mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Do bàn chân bị sưng và to lên, mẹ có thể muốn đi lại bằng những đôi giày đế bệt thoải mái cho những tháng sắp tới. Uống đủ nước và bổ sung chất xơ: Mẹ có thể tránh được bệnh trĩ và các triệu chứng mang thai khác bằng cách uống đủ nước và bổ sung các thực phẩm giàu chất xơ như bánh mì nguyên cám, trái cây và các loại rau.',
      },
    ],
  },
  {
    week: 23,
    title: 'Tuần thai kỳ thứ 23',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Khuôn mặt của con của mẹ giờ đã được phát triển hoàn chỉnh. Một số mẹ có thể nhận thấy các cơn gò Braxton-Hicks lần đầu.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này con của mẹ nặng khoảng 550g và dài khoảng 30cm – kích thước bằng một quả thanh long. Khuôn mặt dễ thương của con đã phát triển hoàn chỉnh, chỉ còn thiếu phần mỡ, đặc điểm giúp con trông mũm mĩm hơn cũng sẽ nhanh chóng xuất hiện. Da: Lúc này da con của mẹ vẫn còn trong suốt và có nếp nhăn, nhưng khi mỡ bắt đầu tích tụ dưới da, da sẽ trở nên rõ ràng hơn. Da có màu đỏ hồng do mạch máu đang hình thành bên dưới. Chuyển động của mắt: Mắt của con của mẹ bắt đầu có chuyển động nhanh. Điều này có nghĩa là não của con của mẹ hoạt động tích cực hơn và cũng có thể là dấu hiệu cho thấy con của mẹ bắt đầu có giấc mơ và suy nghĩ. Dấu vân tay và vân chân: Các đường vân bắt đầu xuất hiện ở lòng bàn tay và bàn chân, sau này sẽ tạo nền tảng cho dấu vân tay và vân chân. Nấc cụt: con của mẹ có thể bắt đầu nấc cụt gây ra các chuyển động giật cục mà mẹ có thể cảm nhận được.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Tử cung của mẹ đang lớn lên để có đủ chỗ cho con của mẹ và cũng khiến bụng mẹ to ra. Ngoài ra, ngực của mẹ cũng sẽ dần dần tăng kích thước và mẹ có thể sớm cần một chiếc áo ngực mới với dây đai rộng – loại áo ngực được thiết kế riêng cho mẹ mang thai và cho con bú. Phù: Mẹ có thể bị phù chân vào buổi chiều tối. Trong một vài trường hợp, sưng phù có thể là bình thường nhưng nếu trở nên nghiêm trọng, đó có thể là dấu hiệu của tiền sản giật. Cơn gò Braxton-Hicks: Thông thường những cơn gò giả này thường xảy ra vào buổi chiều hoặc buổi tối sau các hoạt động thể chất hoặc quan hệ tình dục. Chúng vô hại và cũng không phải là dấu hiệu chuyển dạ thực sự. Mẹ có thể hiểu rằng tử cung đang luyện tập sẵn sàng cho việc sinh nở.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm lúc này' },
      {
        type: 'paragraph',
        text: 'Nhân viên chăm sóc sức khỏe nên kiểm tra mẹ có bị đái tháo đường thai kỳ cho lần hẹn khám thai tới hay không, thường từ giữa tuần thứ 24 và tuần thứ 28. Xét nghiệm lượng đường trong máu: Giống như các loại bệnh đái tháo đường khác, đái tháo đường thai kỳ ảnh hưởng đến quá trình chuyển hóa đường (glucose). Tình trạng này dẫn đến tăng lượng đường trong máu và có thể ảnh hưởng đến quá trình mang thai của mẹ và sức khỏe của con của mẹ . Vì vậy, mẹ nên làm xét nghiệm dung nạp glucose đường uống (OGTT). Thông thường, mẹ không được ăn hoặc uống bất kỳ thứ gì (ngoài nước lọc) trong vòng từ 8 đến 14 giờ trước khi xét nghiệm. Mẹ có thể trao đổi với nhân viên chăm sóc sức khỏe liệu có cần chuẩn bị những gì khác nữa không.',
      },
    ],
  },
  {
    week: 24,
    title: 'Tuần thai kỳ thứ 24',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ bắt đầu tương tác nhiều hơn với âm thanh lớn và có thể nháy mắt khi mẹ vỗ tay. Bụng mẹ to dần lên từng ngày do vậy da cũng bị căng và có',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này con của mẹ nặng khoảng 600g và dài khoảng 33cm – kích thước bằng một bắp ngô. Làn da của bé lúc này có màu hồng do các mạch máu đang phát triển. Lông mi, lông mày và tóc không màu đã xuất hiện, màu sắc của chúng sẽ sớm hình thành khi nhận được sắc tố. Nhạy cảm với âm thanh: Ở giai đoạn này, tai trong đã đạt kích thước và hình dạng như người trưởng thành, con của mẹ có thể nghe tốt hơn và nhạy cảm hơn với âm thanh. Vì vậy, mẹ có thể nhận thấy con của mẹ lúc này chuyển động thường xuyên hơn và chủ yếu là để đáp lại giọng của mẹ. Phổi: Phổi của con của mẹ đang bắt đầu tiết ra chất hoạt động bề mặt, một chất màng phủ trên bề mặt của phế nang, giữ cho phổi căng, ngăn xẹp và dính vào nhau khi giảm thể tích xuống. Ở thời điểm này, lượng chất này chỉ có một lượng rất ít, thai nhi sinh ra trong giai đoạn này không có khả năng sống sót. Phản ứng chớp mắt hồi đáp: Khi con của mẹ sợ hãi hoặc giật mình khi nghe thấy tiếng động lớn, mắt bé sẽ chớp để phản ứng lại. Hiện tượng này được gọi là phản ứng chớp mắt, một phản xạ thường được phát triển sớm hơn ở các bé gái trong giai đoạn thai. Các mẹ nên lưu ý rằng tiếng động quá lớn có thể ảnh hưởng đến sức khỏe của con của mẹ do làm tăng nhịp tim, kích thích bé nuốt quá mức.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Mẹ có thể có nhiều thay đổi trong giai đoạn này bao gồm ngứa bụng, vết sọc nâu trên bụng và rạn da. Phù: Mẹ có thể bị phù mắt cá chân và các ngón tay do giữ nước và tắc nghẽn các tĩnh mạch lớn khi tử cung ngày càng lớn. Bên cạnh đó, mẹ có thể thấy ngứa ở lòng bàn tay. Tình trạng này thường là kết quả của việc tích nước gây phù và tăng áp lực lên ống cổ tay. Thận: Thận của mẹ đang phải làm việc cật lực trong việc lọc một lượng máu nhiều hơn trước để hỗ trợ sự phát triển của con của mẹ . Da bị căng: Do kích thước bụng ngày càng to, da vùng bụng căng ra và có thể gây cảm giác ngứa. Sau đây là 3 cách mẹ có thể làm để giảm ngứa:Tắm nước lạnh hoặc nước ấm vì nước nóng có thể làm da bị khô và ngứa hơn Sử dụng xà phòng không mùi Thoa kem urea hoặc kem dưỡng da lotion Chườm lạnh',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Mặc dù một tiếng ồn có cường độ trong giới hạn cho phép không gây nguy hiểm và có thể giúp con của mẹ dễ ngủ, nhưng tiếng ồn quá mức sẽ không tốt vì làm cho mẹ căng thẳng, tăng nhịp tim và gây nuốt quá mức. Nếu mẹ sống và làm việc gần ga tàu, đường phố ồn ào hoặc những nơi có nguồn tiếng động lớn khác, nên cân nhắc cải tạo không gian sống hoặc thay đổi lối sống của mình để giảm mức độ tiếng ồn.',
      },
    ],
  },
  {
    week: 25,
    title: 'Tuần thai kỳ thứ 25',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ lúc này có thể đáp trả với giọng nói quen thuộc như giọng nói của mẹ.',
      },
      {
        type: 'paragraph',
        text: 'Tử cung lớn dần gây tăng áp lực lên dạ dày của mẹ, vì vậy việc tiêu hóa của mẹ có thể khó khăn hơn.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Ở giai đoạn này, tóc của con của mẹ đã dày hơn và có sắc tố nhưng điều này có thể thay đổi sau khi sinh. Lúc này con của mẹ nặng khoảng 650g và dài khoảng 34cm – kích thước bằng củ khoai tây. Cảm giác thăng bằng: con của mẹ giờ đã phân biệt được hướng trên và hướng dưới và có thể dùng cảm nhận sự thăng bằng để xoay người vào đúng vị trí khi được chào đời, với tư thế đầu hướng xuống và chân hướng lên. Ngủ và thức: con của mẹ dành phần lớn thời gian trong tử cung mẹ để ngủ. Khi con của mẹ ngủ, chuyển động mắt nhanh (REM) xảy ra, đó là khi con của mẹ đang ngủ say và có thể đang mơ. Hoạt động này rất quan trọng cho sự phát triển khỏe mạnh của não. Nhưng liệu não của thai nhi, chưa trưởng thành có thực sự theo chu kỳ thức ngủ hay chỉ đơn thuần là một trạng thái không hoạt động? Điều này vẫn còn là bí ẩn.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Do tử cung ngày càng lớn gây tăng áp lực lên các cấu trúc trong ổ bụng bao gồm ruột khiến các tình trạng đầy hơi có thể sẽ tăng lên. Khó tiêu và ợ nóng: Trong thai kỳ, lượng progesterone tăng cao trong cơ thể gây chậm nhu động ruột. Ngoài ra nó còn làm giãn các cơ giữa dạ dày và thực quản của mẹ khiến axit dạ dày trào ngược lên thực quản. Sưng phù: Hiện tượng giữ nước có thể làm sưng mặt, tay và chân. Trong hầu hết các trường hợp, hiện tượng này vô hại,tuy nhiên mẹ nên được bác sĩ kiểm tra huyết áp để chắc chắn đó không phải là chứng tiền sản giật với triệu chứng huyết áp cao. Tình trạng này nếu không được điều trị có thể dẫn đến các biến chứng nghiêm trọng cho mẹ và con của mẹ . Ăn uống lành mạnh: Mẹ hãy chia thành các bữa ăn nhỏ, tránh các loại thực phẩm nhiều chất béo, cay và nhiều dầu mỡ vì chúng có thể làm xuất hiện các triệu chứng khó chịu. Cố gắng uống đủ nước.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Có rất nhiều việc mẹ có thể làm trong giai đoạn này trước khi bụng mẹ quá lớn và di chuyển khó khăn. Lên kế hoạch cho nơi chăm sóc trẻ: Đã đến lúc mẹ bắt đầu nghĩ đến một không gian dành riêng cho con của mẹ sẽ ở trong tháng đầu tiên sau sinh. Nơi chăm sóc bé có thể là trong phòng của con, phòng ngủ của mẹ hay một góc ấm cúng trong phòng khách để bé có thể ngủ và ở cả ngày. Điều quan trọng là nơi này an toàn và thuận tiện cho cả mẹ và bé và nơi này phải gần để mẹ luôn có thể nghe thấy tiếng của bé bất kỳ lúc nào bé cần mẹ. Đảm bảo không khí trong nhà phải sạch sẽ, mẹ có thể cân nhắc mua máy lọc không khí có bộ lọc HEPA. Mẹ có thể cần sơn lại một vài bức tường trong nhà bằng sơn tường không chứa chì để đảm bảo con của mẹ không tiếp xúc hoặc hít phải chì. Những tiếng ồn trắng như máy móc hoặc các loa phát tiếng ồn trắng có thể giúp bé dễ ngủ vì bé đã quen với mức độ âm thanh của máu và nhịp tim tim của mẹ tạo ra khi còn ở trong tử cung.',
      },
    ],
  },
  {
    week: 26,
    title: 'Tuần thai kỳ thứ 26',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ có thể đã ở tư thế quay đầu xuống, vị trí lý tưởng để sinh tự nhiên. Mẹ có thể bị gián đoạn giấc ngủ do nội tiết tố và bụng ngày càng lớn.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này con của mẹ nặng khoảng 750g và dài khoảng 35cm – kích thước bằng một bắp cải tím. Thính giác và ngôn ngữ: Đôi tai đã hoàn thiện đầy đủ. Mặc dù các âm thanh bên ngoài sẽ trở nên méo mó vì con của mẹ đang được bao quanh bởi nước ối và cơ thể của mẹ, não của con của mẹ đang bắt đầu tiếp thu ngôn ngữ. Nếu mẹ trò chuyện nhiều với con bằng tiếng mẹ đẻ từ khi con của mẹ còn trong bụng thì sau khi chào đời bé sẽ có nhiều khả năng chú ý đến những người cùng nói ngôn ngữ đó. Trong vài tuần tới, con của mẹ sẽ phản ứng nhanh hơn với âm thanh, đặc biệt với giọng nói của mẹ. Phổi: Các nhánh phế quản tiếp tục phân nhánh và mở rộng như một thân cây đang vươn lên cao. Cho đến lúc này, các phế quản đã trải qua 17 lần phân nhánh, và mỗi nhánh tận cùng có từ 2 phế quản hô hấp trở lên. Trong 2 tuần nữa, con của mẹ có cơ hội sống sót cao hơn nếu sinh non bởi vì phổi đã có thể tự thở được. Móng tay: Những chiếc móng tay nhỏ xinh của con của mẹ giờ đã có thể nhìn thấy sau nhiều tuần phát triển.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Mẹ có thể cảm thấy mệt mỏi hơn vì tình trạng chuột rút ở chân có thể ảnh hưởng đến giấc ngủ. Chuột rút ở chân: Nguyên nhân gây chuột rút ở chân trong thai kỳ vẫn chưa được biết rõ. Một số giả thuyết cho rằng con của mẹ ép lên các dây thần kinh và mạch máu đi đến chân của mẹ. Tuy nhiên thiếu canxi hoặc magie hoặc mất nước cũng có thể gây ảnh hưởng. Mẹ có thể ngăn ngừa triệu chứng này bằng cách gập và duỗi chân vài lần trước khi đi ngủ. Cơn gò Braxton Hicks: Mẹ có thể cảm thấy các cơn gò Braxton Hicks và càng gần đến ngày dự sinh, chúng càng giống như những cơn gò chuyển dạ thực sự. Mẹ sẽ nhận ra thời điểm chuyển dạ thực sự đã đến khi các cơn gò tử cung xuất hiện cứ sau mỗi 5 phút.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Mặc dù ngày càng khó có thể duy trì trạng thái năng động với tất cả trọng lượng cơ thể tăng thêm, mẹ hãy cố gắng duy trì năng động để chuẩn bị cho việc chuyển dạ. Xét nghiệm yếu tố Rh trong máu: Nếu xét nghiệm Rh âm tính khi bắt đầu mang thai, mẹ sẽ được tiêm Anti-D vào khoảng tuần thứ 26-28. Anti-D sẽ giúp cơ thể mẹ ngừng sản xuất kháng thể để ngăn hệ thống miễn dịch của mẹ phá hủy các tế bào hồng cầu của con của mẹ .',
      },
    ],
  },
  {
    week: 27,
    title: 'Tuần thai kỳ thứ 27',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Đây là tuần cuối cùng của tam cá nguyệt thứ hai. Hiện tại, não của con của mẹ đang phát triển nhanh hơn những bộ phận khác của cơ thể. Mẹ có thể',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Não của con của mẹ tiếp tục phát triển nhanh chóng và đang chuẩn bị để có thể điều khiển toàn bộ cơ thể sau khi chào đời. con của mẹ nặng khoảng 900g và dài khoảng 36cm – kích thước bằng một bông súp lơ. Hệ thần kinh: Hệ thần kinh của con của mẹ đang tiếp tục hoàn thiện nhưng nguy cơ thiểu năng tâm thần nếu xảy ra sinh non vẫn còn hơn 10%. Tuy nhiên, sang tuần tới, rủi ro này sẽ giảm đi rất nhiều. Mỡ: con của mẹ cũng đang bắt đầu tích mỡ, nó giúp da trông mịn màng hơn. Đôi má của bé yêu cũng sẽ bắt đầu trông đầy đặn hơn. Vị giác: Vị giác của con của mẹ lúc này rất phát triển. Điều này có nghĩa là con của mẹ có thể phân biệt được sự thay đổi mùi vị của nước ối. Nếu mẹ ăn thức ăn cay, bé sẽ có thể cảm nhận được sự khác biệt trong nước ối. Một vài trẻ thậm chí sẽ phản ứng với vị cay đó bằng cách nấc cụt. Nấc cụt: Nấc cụt là một phần rất bình thường trong quá trình phát triển tự nhiên của trẻ. Hiện tượng này xảy ra cho thấy não đang học cách kiểm soát các cơ hô hấp. Vì vậy, nếu con của mẹ đang nấc cụt trong bụng mẹ thì đó là một điều tốt.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Do con của mẹ không ngừng lớn lên và bụng của mẹ cũng ngày càng to lên, mẹ có thể cảm thấy mệt mỏi về thể chất. Lưng và xương chậu có thể cảm thấy đau nhức do hormone relaxin trong thai kỳ gây nên, hormone này làm suy yếu các khớp của mẹ và gây ra tình trạng được gọi là rối loạn chức năng xương mu (SPD). Rối loạn chức năng xương mu (SDP): Mặc dù SDP không làm hại con của mẹ nhưng nó có thể gây khó chịu cho mẹ. Có nhiều phương pháp điều trị có thể giúp mẹ đối phó với tình trạng này. Vì vậy, mẹ hãy tham khảo ý kiến bác sĩ nếu mẹ bị đau xương mu, xương chậu, đáy chậu hoặc đau lưng dưới tương tự như SPD.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Khi ngày dự sinh càng đến gần, tốt hơn hết mẹ nên chuẩn bị nhà cho con của mẹ . Mẹ có thể chuẩn bị một chiếc giường hay cũi trẻ em gần giường của mẹ và treo rèm cửa màu vàng hoặc các màu dễ chịu khác. Vắc-xin Tdap: Vắc-xin Tdap thường được tiêm từ tuần thứ 27-36 của thai kỳ để ngăn ngừa con của mẹ mắc các bệnh ho gà ở trẻ sơ sinh 2 tháng tuổi, ho gà là một bệnh nhiễm trùng đường hô hấp có thể đe dọa tính mạng của trẻ sơ sinh. Khi tiêm vắc-xin, cơ thể mẹ tạo ra các kháng thể để chống lại bệnh này. Các kháng thể sẽ được truyền cho con của mẹ qua nhau thai.',
      },
    ],
  },
  {
    week: 28,
    title: 'Tuần thai kỳ thứ 28',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Chúc mừng mẹ! Mẹ đang bước vào tam cá nguyệt thứ ba! Tại thời điểm này, con của mẹ có thể điều chỉnh nhiệt độ cơ thể và bắt đầu thở, hai dấu hiệu cho',
      },
      {
        type: 'paragraph',
        text: 'Mẹ sẽ còn phải trải qua nhiều cơn đau nữa mới đến lúc có thể ẵm bế con của mẹ trong vòng tay!',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Con của mẹ sẽ tiếp tục tăng cân do tích nhiều mỡ dưới da hơn và tận hưởng các chu kỳ giấc ngủ REM và không REM giống như mẹ. Lúc này con của mẹ nặng khoảng 1.15 kg và dài khoảng 37cm – kích thước bằng một quả cà tím. Nhìn trộm: Mi mắt của con của mẹ đang mở rộng một phần, có nghĩa là võng mạc, lớp trong cùng, nhạy cảm với ánh sáng của mắt hiện giờ đã phát triển. Các lông mi nhỏ xinh cũng đã hình thành. Phổi: Phổi và hệ thống tuần hoàn lúc này đã trưởng thành hơn. Điều này có nghĩa là phổi của con của mẹ có đủ các phế nang và chất hoạt động bề mặt cho phép việc trao đổi khí tốt. Các phế nang có nhiệm vụ trao đổi oxy và carbon dioxide, trong khi chất hoạt động bề mặt đóng vai trò như một màng bám trên thành túi khí giúp làm phồng túi khí. Vì lúc này trẻ có đủ cả túi phế nang và chất hoạt động bề mặt, trẻ sinh non ở tuần thứ 28 có thể có cơ hội sống sót cao dưới sự chăm sóc đặc biệt. Hệ thần kinh: Lúc này hệ thần kinh trung ương có thể điều khiển nhịp thở nhịp nhàng và cân bằng nhiệt độ cơ thể của con của mẹ . Khả năng kiểm soát nhiệt độ cơ thể là một cột mốc quan trọng đối với con của mẹ , vì nó cho thấy bé đã sẵn sàng ra ngoài bụng mẹ.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Thật không may, triệu chứng trào ngược dạ dày thực quản và chứng khó tiêu cũng chưa được cải thiện. Và do sự thay đổi của nội tiết tố, mẹ có thể bị chảy máu cam. Tăng đường huyết: Nếu mẹ cảm thấy khát nước, đau đầu, khó tập trung và có các vấn đề về thị lực, mẹ có thể bị tăng đường huyết, đây là thuật ngữ y học chỉ lượng đường trong máu cao (đái tháo đường). Vì nó ảnh hưởng đến 10% phụ nữ mang thai, các bác sĩ thường tiến hành xét nghiệm dung nạp glucose (GTT) trong tuần 26-28 của thai kỳ để đánh giá mẹ có bị đái tháo đường hay không. Nếu mẹ có kết quả xét nghiệm yếu tố Rhesus âm tính, bác sĩ có thể tiêm một mũi anti-D immunoglobulin trong thời gian này.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Vì chỉ còn khoảng 12 tuần nữa con của mẹ sẽ chào đời, mẹ có thể muốn tranh thủ thời gian này đọc về những việc cần làm trong các trường hợp khẩn cấp. Mẹ thậm chí có thể tham gia khóa học sơ cứu như hồi sức tim phổi cho trẻ sơ sinh.',
      },
    ],
  },
  {
    week: 29,
    title: 'Tuần thai kỳ thứ 29',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ hiện đang phát triển nhanh hơn, to lớn hơn và khỏe hơn trong khi các cơ và phổi cũng không ngừng phát triển. Tử cung của mẹ ngày càng',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này con của mẹ nặng khoảng 1.35 kg và dài khoảng 38cm – kích thước bằng một quả ổi. Khỏe mạnh hơn: con của mẹ tích cực đá và vươn duỗi hơn, mẹ có thể cảm thấy các cú huých bằng khủy tay và đầu gối của con. Các chuyển động có lẽ đang trở nên mạnh hơn và đều đặn hơn. Mỡ trắng: Trong tuần này lượng mỡ tăng lên nhanh chóng, đặc biệt là mỡ trắng đang tăng lên gần 3.5% trọng lượng cơ thể. Chỉ trong 12 tuần, cơ thể của con của mẹ sẽ có nhiều mỡ hơn, khoảng 16%. Mỡ trắng có rất nhiều ý nghĩa: nguồn năng lượng dự trữ lớn nhất cho cơ thể. Nó là chất cách nhiệt và bảo vệ cho các cơ quan nội tạng cũng như đóng vai trò là đệm chống sốc từ môi trường bên ngoài. Chất béo tích tụ dưới da và sẽ làm mờ nếp các nếp nhăn trên da.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Bé ngày càng lớn lên và nồng độ progesterone của mẹ cũng tăng lên có thể khiến mẹ bị hụt hơi. Thông thường, mẹ không có gì phải lo lắng trừ khi nó nghiêm trọng và gây đau. Trong trường hợp này, mẹ nên tham khảo ý kiến bác sĩ. Giãn tĩnh mạch: Một triệu chứng khác phổ biến ở giai đoạn này của thai kỳ là sự xuất hiện của chứng giãn tĩnh mạch. Mẹ nên cố gắng thúc đẩy lưu thông máu bằng cách nâng cao chân và vận động chân thường xuyên. Ngoài ra, tránh căng thẳng quá mức. Căng thẳng làm tăng mức độ cortisol trong cơ thể mẹ và mức độ gây căng thẳng của hormone này cao hơn sẽ làm giảm khả năng đàn hồi của da gây nên nhiều vết rạn da hơn. Đau đầu: Ngoài ra, mẹ có thể hay quên và đau đầu trong tam cá nguyệt cuối cùng này. Mẹ hãy cố gắng nghỉ ngơi thường xuyên, uống đủ nước và tránh bị căng thẳng. Nếu mẹ bị đau đầu và ảnh hưởng đến sức khỏe tâm thần hoặc thói quen hàng ngày, mẹ có thể đến khám với bác sĩ.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Sau khi con của mẹ chào đời, mẹ sẽ cần một chiếc ghế cho bé trên ô tô để đưa con về nhà an toàn. Nhưng tốt hơn hết mẹ không nên đợi đến ngày dự sinh, trong trường hợp con có thể chào đời sớm hơn. Mẹ hãy mua ngay bây giờ vì có thể giúp mẹ có thêm thời gian lắp đặt ghế đúng cách và dùng thử trước khi con chào đời. Mẹ nên lưu ý rằng ở một số quốc gia có yêu cầu một chỗ ngồi bắt buộc dành cho trẻ sơ sinh và những chỗ khác cho trẻ nhỏ. Mẹ nên nghiên cứu trước khi mua ghế ô tô cho trẻ vì có rất nhiều sự lựa chọn và điều quan trọng là mẹ mua đúng ghế phù hợp với con của mẹ .',
      },
    ],
  },
  {
    week: 30,
    title: 'Tuần thai kỳ thứ 30',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ bây giờ có thể đã xoay sang tư thế lý tưởng để sinh tự nhiên. Khi ngày dự sinh đến gần, mẹ có thể cảm thấy lo lắng cùng với sự thay đổi',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Mỗi ngày cơ thể bé sẽ tích trữ thêm mỡ để giữ ấm. Lúc này con của mẹ nặng khoảng 1.5 kg và dài khoảng 40cm – kích thước bằng một củ cải trắng. Biểu cảm khuôn mặt: Lúc này con của mẹ phản ứng với thức ăn có vị đắng bằng cách biểu cảm khuôn mặt, điều này có nghĩa là phản xạ giữa vị giác và cơ mặt bắt đầu được thiết lập. Hệ thống miễn dịch: Để chuẩn bị bước ra thế giới bên ngoài, con của mẹ đang xây dựng hệ thống miễn dịch của mình bằng cách tiếp nhận một số kháng thể từ mẹ. Người ta tin rằng hệ thống miễn dịch của trẻ hoạt động tốt hơn trong môi trường quen thuộc với cả mẹ và bé. Vì vậy, nơi an toàn nhất cho con của mẹ sau sinh chính là nhà của mẹ. Đầu hướng xuống dưới : Cho đến lúc này, hầu hết trẻ đã bắt đầu vào tư thế xoay đầu xuống dưới, điều này sẽ dễ dàng hơn cho quá trình sinh tự nhiên. Nếu con của mẹ không xoay đầu xuống, mẹ có thể cần phải chuẩn bị cho tình huống sinh ngôi mông. Khoảng 3-5% phụ nữ mang thai đủ tháng (37-40 tuần) sinh ngôi mông và hầu hết trong số họ được sinh mổ vi an toàn hơn so với sinh thường. Thị lực: Mặc dù mắt vẫn đang trưởng thành nhưng chúng đã ở đúng vị trí. Lúc này, thị lực vẫn còn kém, nhưng con của mẹ có thể mở mắt. Thị giác sẽ tiếp tục được cải thiện khi còn trong tử cung và quá trình cải thiện sẽ ngày càng nhanh để đạt đến giai đoạn mà con của mẹ có thể quan sát các vật thể chuyển động theo chiều dọc và chiều ngang trong những tuần tiếp theo. Quá trình tạo hồng cầu: Vào cuối tuần này, tủy xương, một chất lỏng bên trong xương đã đủ trưởng thành để trở nên nơi sản xuất chính để tạo các hồng cầu, bạch cầu và tiểu cầu. Các tế bào hồng cầu giúp vận chuyển oxy; các tế bào bạch cầu giúp chống lại nhiễm trùng, trong khi các tiểu cầu giúp đông máu và phòng chống chảy máu quá nhiều khi con của mẹ bị thương.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này bụng của mẹ ngày càng lớn dần lên và đi tiểu thường xuyên hơn, mẹ sẽ càng khó có những giấc ngủ ngon. Mẹ có thể mơ nhiều hơn và nhớ rõ ràng mỗi khi thức dậy. Thêm vào đó, sự căng thẳng và lo lắng khiến những giấc mơ sinh động đó có thể trở nên đáng sợ. Hãy thảo luận với chồng hoặc bác sĩ về những giấc mơ để trút bỏ phần nào những lo lắng của mẹ.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Khi ngày dự sinh càng đến gần, mẹ có thể muốn đọc và tìm hiểu thêm về quá trình phát triển sớm của trẻ hoặc cách con của mẹ và những trẻ khác phát triển thể chất và tinh thần một cách toàn diện. Một trong số các chủ đề mà nhiều mẹ quan tâm có thể là giai đoạn phát triển quan trọng của não bộ. Giai đoạn quan trọng cho sự phát triển của não bộ: Những trải nghiệm ban đầu của con của mẹ , đặc biệt trong ba năm đầu đời sẽ tạo nên nền tảng cho việc học tập, hành vi và sức khỏe của con. Trong suốt giai đoạn quan trọng này, bộ não của con của mẹ kết nối hàng triệu tế bào thần kinh mỗi giây. Mẹ có thể giúp phát triển những kết nối thần kinh này bằng cách tương tác qua lại với con của mẹ , một quá trình được gọi là cung cấp và trả lại. Vì vậy, bất cứ khi nào con bập bẹ, dùng cử chỉ hoặc khóc, mẹ hãy đáp lại bằng ánh mắt, lời nói, nụ cười hoặc cái ôm.',
      },
    ],
  },
  {
    week: 31,
    title: 'Tuần thai kỳ thứ 31',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ giờ có thể xoay đầu lại và có thể phản hồi lại giọng nói của mẹ. Nếu mẹ có xuất hiện các cơn gò sinh lý Braxton-Hicks, chúng có thể kéo',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này các cơ quan chính đã phát triển hoàn thiện và con của mẹ nặng khoảng 1.6 kg và dài khoảng 41cm – kích thước bằng một quả đu đủ. Mắt và phổi: Mắt của {{NAME}} có thể tập trung nhưng hai phổi vẫn đang phát triển. Và con của mẹ sẽ sớm có thể tự thở. Các khớp cổ: Các khớp cổ của con của mẹ đang trở nên linh hoạt hơn giúp bé có thể dễ dàng di chuyển khi sinh trong hai tháng nữa. Trọng lượng cơ thể: Đến tuần này, con của mẹ tăng cân nhanh hơn trước do tích tụ nhiều mỡ hơn. Ngoài cân nặng của con của mẹ , lượng nước ối, lượng máu và trọng lượng của nhau thai cũng đang tăng lên. Phản xạ bú mút: con của mẹ đang phát triển phản xạ bú mút và bây giờ bé có thể bú mút ngón tay cái. Phản xạ này giúp con của mẹ bú vú của mẹ khi chào đời. Các trẻ sinh non có thể không có phản xạ bú mút mạnh và bởi vậy có thể cần thêm sự trợ giúp để nhận được chất dinh dưỡng qua ống dẫn đặt qua mũi vào dạ dày. Cổ và khớp của con của mẹ trở nên linh hoạt hơn để em bé có thể dễ dàng di chuyển khi chuyển dạ trong hai tháng tới.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Các cơn gò Braxton Hicks trong tam cá nguyệt thứ ba này là hiện tượng bình thường, nhưng nếu mẹ có hơn bốn cơn gò mỗi giờ, đó có thể là dấu hiệu sớm của chuyển dạ và mẹ cần liên hệ với bác sĩ ngay lập tức. Các triệu chứng của chuyển dạ sớm khác là cảm thấy tăng áp lực lên xương chậu, tiết dịch âm đạo có máu và đau lưng dưới. Mẹ có thể gặp Các triệu chứng khác bao gồm:Các vấn đề về giấc ngủCác vết rạn daBệnh trĩ Nướu bị sưng và chảy máuĐau một bên bụng do tử cung ngày càng lớn dần (đau dây chằng tử cung)',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Vì trong cuộc sống thực tế không có một cẩm nang nào chính xác về việc nuôi dạy con cái. Mẹ hãy tận dụng thời gian này để tìm hiểu về các phương pháp nuôi dạy con cái khác nhau và tin tưởng vào trực giác của mình để tìm ra phương pháp phù hợp để nuôi dạy con của mẹ . Khi ngày dự sinh đang đến gần, mẹ có thể muốn đọc thêm về “Dạy con theo phương pháp gắn bó”. Dạy con theo phương pháp gắn bó : Phương pháp này lấy trẻ làm trung tâm, thúc đẩy mối quan hệ giữa mẹ và con của mẹ bằng cách đáp trả và nhạy cảm với các nhu cầu của con, bao gồm các hoạt động như mặc quần áo cho con và ngủ chung cùng con. Có giả thuyết cho rằng những đứa trẻ có sự gắn bó an toàn và tin tưởng vào mẹ chúng, sau này có xu hướng độc lập và gặp ít khó khăn hơn trong việc hình thành các mối quan hệ. Trên hết, chúng trải qua mức độ căng thẳng ít hơn và do đó, ít gặp các vấn đề về sức khỏe.',
      },
    ],
  },
  {
    week: 32,
    title: 'Tuần thai kỳ thứ 32',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ giờ có thể đang ở tư thế xoay đầu xuống, phần đầu sẽ di chuyển gần xương chậu của mẹ hơn.',
      },
      {
        type: 'paragraph',
        text: 'Các triệu chứng trong thai kỳ của mẹ vẫn còn và số lần đi tiểu sẽ tăng lên.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Tóc đã mọc trên đầu và những chiếc móng chân nhỏ xinh giờ cũng đã bắt đầu lộ diện. Lúc này con của mẹ nặng khoảng 1.8 kg và dài khoảng 42cm – kích thước bằng một chiếc lá cải xoăn. Tăng khả năng phối hợp: con của mẹ có thú vui mút ngón tay cái giúp bé tăng cường khả năng phối hợp động tác và cách thức hoạt động của những bộ phận khác của cơ thể. Vị trí: Hiện con của mẹ đã sẵn sàng để chào đời và có thể đã ở vị trí xoay đầu xuống. Trên thực tế, khoảng 90% trẻ sinh ra trong tuần thứ 32 của thai kỳ đều sống sót và lớn lên khỏe mạnh. Lông măng: Lớp lông mịn che phủ cơ thể của con của mẹ trong vài tháng qua sẽ bắt đầu rụng trong tuần này. Phản xạ đồng tử: Đồng tử của con của mẹ có thể thu nhỏ lại để phản ứng với ánh sáng. Hiện tượng này có nghĩa là các dây thần kinh thị giác phản ứng với các cảm giác thị giác hiện đã sẵn sàng hoạt động. Mặc dù con của mẹ có thể nhìn được ngay sau khi sinh nhưng tầm nhìn vẫn còn hạn chế vì mắt chỉ có thể tập trung vào một vật thể trong vài giây. Thở: con của mẹ sẽ tập thở nhiều hơn trong tuần này. Nó không chỉ giúp bé sẵn sàng thở sau khi sinh mà còn giúp phổi tiết ra nhiều chất hoạt động bề mặt hơn, một chất bôi trơn giúp con của mẹ thở dễ dàng hơn. Cơ quan sinh dục: Với bé trai, tinh hoàn của bé đang di chuyển xuống bìu.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Triệu chứng phổ biến trong tam cá nguyệt này có thể là tăng số lần đi tiểu. Cho đến lúc này, sự gia tăng lưu lượng máu có thể đã đạt đến đỉnh điểm, vì vậy những triệu chứng liên quan đến tình trạng này vẫn còn hiện diện. 50% lượng máu tăng lên cung cấp đủ chất dinh dưỡng cho con của mẹ và sẽ bù lại lượng máu mẹ sẽ mất khi sinh.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Khi ngày dự sinh đến gần, mẹ có thể chuẩn bị sẵn sàng các đồ dùng cần thiết khi ở bệnh viện. Trong giai đoạn này, mẹ cũng có thể đăng ký với bệnh viện và chuẩn bị các giấy tờ cần thiết. Việc này giúp mẹ tiết kiệm thời gian khi chuyển dạ. Mẹ cũng có thể xem xét việc chọn phương pháp giảm đau khi sinh. Gây tê ngoài màng cứng là một trong những phương pháp phổ biến nhất để kiểm soát cơn đau khi sinh. Tuy nhiên, một số phụ nữ có thể chọn sinh dưới nước hoặc sinh thường mà không cần đến thuốc giảm đau.',
      },
    ],
  },
  {
    week: 33,
    title: 'Tuần thai kỳ thứ 33',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ giờ đây có thể mở mắt khi thức và nhắm mắt khi ngủ.',
      },
      {
        type: 'paragraph',
        text: 'Vì bé vẫn đang tăng cân thêm và bụng mẹ ngày càng lớn dần lên, mẹ nên cẩn thận hơn khi di chuyển để tránh va chạm vào người khác hoặc đồ vật khác.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này con của mẹ nặng khoảng 2 kg và dài khoảng 43cm – kích thước bằng một quả dứa. Từ tuần này trở đi, bé sẽ tiếp tục tăng thêm khoảng 225g mỗi tuần cho đến khi sinh. Mắt: Đồng tử đã bắt đầu phản ứng với ánh sáng bằng cách thay đổi kích thước của chúng, vì lúc này võng mạc của con của mẹ có thể bắt được các nguồn ánh sáng từ mặt trời hoặc đèn pin. con của mẹ hiện vẫn mở mắt mỗi khi thức. Hộp sọ mềm: Không giống như những loại xương khác đã trở nên cứng cáp, các xương sọ lúc này vẫn còn mềm và rời nhau cho đến khi sinh. Điều này giúp đầu đi qua đường dẫn sinh dễ dàng hơn do các xương sọ phải trượt vào nhau để giảm kích cỡ đầu trong khi vẫn bảo vệ não. Khoảng cách giữa các xương sọ được gọi là thóp.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Bụng mẹ ngày càng lớn và mẹ có thể mẹ chưa quen với kích thước này. Vì vậy, mẹ nên cẩn thận để không bị va chạm vào bụng. Mẹ vẫn có thể quan hệ tình dục mà không ảnh hưởng gì đến thai nhi. con của mẹ có thể không biết chuyện gì đang xảy ra, mặc dù em đã lớn hơn trước. Một số phụ nữ có thể khó ngủ trong tam cá nguyệt thứ ba và nguyên nhân gồm nồng độ hormone tăng, bồn chồn và không thể tìm được một tư thế ngủ thoải mái. Vì việc ngủ đủ là rất cần thiết, mẹ nên cố gắng ngủ càng nhiều càng tốt.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Mẹ luôn nên đếm số lần đạp bởi vì đó là một cách tốt để theo dõi tình trạng sức khỏe của bé. Mẹ có thể dành một thời gian cụ thể cho nó, sau ăn sáng hoặc ăn trưa là thời điểm thích hợp. Đi dạo dưới ánh nắng mặt trời: Mẹ có thể ra ngoài trời và để con của mẹ tiếp xúc với ánh nắng tự nhiên. Điều này có thể giúp cải thiện sự phát triển mắt của con của mẹ , cung cấp cho mẹ và bé thêm một lượng vitamin D. Nên tránh dùng đèn pin chiếu vào bụng vì ánh sáng từ đèn pin quá chói và có thể gây căng thẳng cho con của mẹ .',
      },
    ],
  },
  {
    week: 34,
    title: 'Tuần thai kỳ thứ 34',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Phổi, não và hệ thần kinh trung ương gần như đã phát triển đầy đủ. Một vài triệu chứng thai kỳ có thể thuyên giảm hoặc biến mất khi con của mẹ xoay',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Tuần này, các móng tay của con của mẹ đã dài đến đầu ngón, bé có thể đi tiểu khoảng 500 ml mỗi ngày và đã hình thành một ít phân su đầu tiên. Lúc này con của mẹ nặng khoảng 2,1 kg và dài khoảng 45cm – kích thước bằng một quả dưa lưới. Các cơ quan quan trọng: Phổi, não và hệ thần kinh trung ương của con của mẹ tiếp tục tăng tốc độ phát triển và gần như hoàn thiện, tuy nhiên phổi vẫn còn phải phát triển hơn nữa. Kháng thể: Bé đã nhận được kháng thể từ mẹ, các kháng thể này sẽ được sử dụng để chống lại các các cuộc tấn công tiềm ẩn từ vi khuẩn và vi-rút sau sinh. Lượng nước ối thay đổi: Từ tuần này đến khoảng tuần thứ 36, lượng nước ối bao quanh con của mẹ đạt mức cao nhất. Ở tuần thứ 37, lượng nước ối sẽ giảm xuống để nhường chỗ cho kích thước ngày càng tăng của con của mẹ . Ngoại hình: Da của con của mẹ mịn màng hơn, cánh tay và chân đầy đặn hơn do tích tụ mỡ ngày càng nhiều. Ở giai đoạn này, lượng mỡ trắng chiếm khoảng 8% trọng lượng cơ thể.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này mẹ có thể dễ thở hơn vì con của mẹ đang bắt đầu di chuyển xuống khung chậu, sẵn sàng để chuyển dạ và giảm áp lực lên phổi của mẹ. Hiện tượng này được gọi là “tụt bụng” và thường là dấu hiệu sắp chuyển dạ. Nhưng nếu đây là lần mang thai lần đầu tiên, các triệu chứng “tụt bụng” có thể xảy ra vài tuần trước khi chuyển dạ.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Những người mới làm cha mẹ có thể khó tìm được những giấc ngủ ngon, đặc biệt khi bé khó đi vào giấc ngủ cho dù mẹ có cố gắng đi chăng nữa. Vì vậy, nếu mẹ cảm thấy quá mệt mỏi để trở thành một ông bố bà mẹ tốt và chu đáo, mẹ có thể nên cân nhắc luyện tập giấc ngủ cho trẻ. Lầm tưởng về việc luyện tập giấc ngủ cho bé: Có một số phương pháp luyện ngủ cho bé và điều quan trọng là mẹ phải hiểu mục đích của từng phương pháp. Vì vậy, hãy tìm hiểu những phương pháp luyện ngủ phù hợp mà không gây hại cho con của mẹ . Một điều chắc chắn là: con của mẹ cần nhất là được ở gần mẹ, đặc biệt là trong đêm tối. Nếu mẹ luyện ngủ cho bé để mẹ có thể trở thành một bà mẹ chu đáo hơn vào ban ngày, hãy đảm bảo mẹ tìm được một phương pháp nhẹ nhàng để luyện tập cho bé. Có thể tìm cách ngủ chung với con của mẹ bằng cách cho bé ngủ ngay cạnh giường của mình.',
      },
    ],
  },
  {
    week: 35,
    title: 'Tuần thai kỳ thứ 35',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Hầu hết xương và các cơ quan của con của mẹ đều đã hoàn thiện đầy đủ. Mẹ có thể bắt đầu cảm nhận được các cơn gò tử cung thường xuyên hơn và có',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Ở giai đoạn này, hầu hết trẻ sơ sinh chuyển từ tư thế ngôi mông sang tư thế xoay đầu xuống. Tư thế xoay đầu xuống: Sau khi xoay đầu xuống, thai nhi sẽ từ từ di chuyển vào trong khung chậu. Đối với lần mang thai đầu tiên, hiện tượng này xảy ra sớm hơn, vài tuần trước ngày dự sinh. Nhưng trong các trường hợp mang thai sau, nó có thể xảy ra ở gần thời điểm chuyển dạ. Chuẩn bị sẵn sàng: con của mẹ hiện đã hình thành đầy đủ xương cũng như các cơ quan khác và sẵn sàng cho ngày chào đời. Tuy nhiên, chỉ còn phổi vẫn đang tiếp tục hoàn thiện. Lúc này con của mẹ nặng khoảng 2,3 kg và dài khoảng 46cm – kích thước bằng một quả dừa. Cơ quan sinh dục: Ở hầu hết các bé trai, tinh hoàn đã di chuyển xuống bìu.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Tử cung của mẹ sẽ bắt đầu cho việc chuyển dạ, vì vậy mẹ có thể bắt đầu có những cơn gò gây đau và kéo dài thường xuyên hơn. Sữa non: Vú của mẹ sẽ sớm bắt đầu tiết ra một chất dịch màu vàng đặc được gọi là sữa non. Sữa non là thức ăn đầu tiên con nhận được sau sinh. Nó chứa đầy các kháng thể và các chất dinh dưỡng quan trọng để giúp con của mẹ xây dựng hệ miễn dịch mạnh mẽ. Mẹ có thể cần phải có miếng đệm thấm sữa để tránh làm ướt áo. Các cơn gò: Các cơn gò sẽ bắt đầu diễn ra thường xuyên hơn, kéo dài hơn và đau hơn. Đó là lúc tử cung chuẩn bị để sinh nở. Một số mẹ cảm thấy bụng mình cứng lại khi những cơn gò sớm này xuất hiện .',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Giữa tuần thứ 35 và 37 của thai kỳ, mẹ sẽ được đề nghị xét nghiệm vi khuẩn liên cầu nhóm B. Xét nghiệm liên cầu khuẩn nhóm B: Một que gòn phết mẫu từ âm đạo và một que gòn khác lấy mẫu từ trực tràng sẽ được lấy và gửi đến phòng xét nghiệm. Khoảng 25% phụ nữ khỏe mạnh mang vi khuẩn này, và thông thường chúng vô hại nhưng đối với trẻ sơ sinh, nó có thể gây ảnh hưởng nghiêm trọng cho bé như viêm màng não, viêm phổi hoặc nhiễm trùng máu. Để tránh bé bị lây nhiễm khi sinh thường, mẹ sẽ được sử dụng kháng sinh trong quá trình chuyển dạ. Tinh hoàn không xuống bìu: Nếu mẹ có một bé trai và con của mẹ được chẩn đoán tinh hoàn không di chuyển xuống bìu, mẹ có thể yêu cầu hẹn kiểm tra định kỳ con của mẹ sau sinh cho trẻ.',
      },
    ],
  },
  {
    week: 36,
    title: 'Tuần thai kỳ thứ 36',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Ở tuần này, phổi đã phát triển đầy đủ và con của mẹ đã sẵn sàng để tự thở. Do áp lực tăng lên các cơ sàn chậu, mẹ có thể vô tình són tiểu khi cười',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Vào cuối tuần này, thai kỳ được coi là gần đủ tháng. Sự phát triển của con của mẹ chỉ còn là sự tích mỡ trong cơ thể. Lúc này con của mẹ nặng khoảng 2,4 kg và dài khoảng 47cm – kích thước bằng một cây măng tre. Các hệ cơ quan: Hầu hết các cơ quan đã hoàn toàn phát triển bao gồm cả phổi và hệ thống tiêu hóa. Mặc dù cả hai cơ quan này đã hoàn thiện nhưng chúng vẫn chưa chính thức hoạt động. Phổi sẽ được kích hoạt ngay khi con của mẹ chào đời và hệ thống tiêu hóa sẽ bắt đầu hoạt động khi bé bú sữa lần đầu tiên, có thể là bú vú mẹ. Lớp sáp bảo vệ: Lớp sáp trắng vẫn được bao phủ trên cơ thể của con của mẹ , bảo vệ cơ thể khỏi nước ối. Chất bôi trơn tự nhiên này cũng hỗ trợ bé đi qua đường dẫn sinh. Nếu ở thời điểm này, con của mẹ vẫn còn ở tư thế không thuận lợi như tư thế ngôi mông, bác sĩ có thể đề nghị những việc cần làm để giúp bé chuyển sang tư thế thuận lợi để sinh thường.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Do áp lực trên bàng quang tăng lên, đôi khi mẹ có thể bị són tiểu. Hãy tiếp tục với bài tập kegel để giảm rò rỉ nước tiểu mỗi khi mẹ ho hoặc hắt hơi. Bên cạnh đó, số lượng các cơn gò sinh lý Braxton Hicks sẽ tăng lên. Giảm chuyển động: Mẹ có thể cảm thấy con của mẹ ít đạp hơn trước đó bởi vì con của mẹ ngày càng lớn hơn. con của mẹ sẽ khó đấm đá hơn do không có đủ khoảng trống trong tử cung mẹ. Tuy nhiên, mẹ sẽ có thể cảm thấy bị căng, cuộn và ngọ nguậy nhiều hơn.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Khi ngày dự sinh đang đến gần, mẹ nên nhận biết dấu hiệu nào là dấu hiệu chuyển dạ. Một số dấu hiệu bao gồm các cơn gò thường xuyên, kéo dài, tiêu chảy và vỡ nước ối. Nếu mẹ nhận thấy ra nước, hãy chắc chắn đó là nước ối vì nó có thể giống như nước tiểu, nước ối trong hơn và không có mùi nước tiểu đặc trưng.',
      },
    ],
  },
  {
    week: 37,
    title: 'Tuần thai kỳ thứ 37',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Các cơ quan của con của mẹ đã hoàn thiện để có thể duy trì sự sống bên ngoài cơ thể mẹ. Trong khi đó, mẹ có thể bắt đầu thấy dịch tiết âm đạo có lẫn',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Ở giai đoạn này, con của mẹ nặng khoảng 2,6 kg và dài khoảng 48cm – kích thước bằng một quả sầu riêng. Bé lúc này được coi là gần đủ tháng do bé đã trưởng thành đủ để duy trì sự sống sau sinh. Bây giờ chỉ còn tùy thuộc vào khi nào bé muốn chào đời. Sẵn sàng để thở: Phổi đã sẵn sàng để hít thở không khí vì con của mẹ tiếp tục tập thở trong nước ối. Tư thế: Đã sẵn sàng ở tư thế xoay đầu xuống, con của mẹ có thể bắt đầu đi vào vùng chậu của mẹ. Phản xạ cầm nắm: con của mẹ đã phát triển các phản xạ mạnh mẽ, bao gồm cả phản xạ cầm nắm. Vì vậy, bé yêu của mẹ sẽ dễ dàng cầm nắm bất kỳ đồ vật nào trong bàn tay. Hormone tuyến giáp: Thyroxine, một loại hormone giúp điều chỉnh quá trình trao đổi chất và phát triển trí não của con của mẹ , hiện đã đạt đến mức độ trưởng thành. Phân su: Ruột của con của mẹ hiện chứa phân su, phân đầu tiên của bé có màu xanh đậm và sẽ thải ra ngoài trong vòng 24 giờ sau sinh.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Quá trình chuyển dạ đến rất nhanh, cổ tử cung của mẹ đã có thể bắt đầu mỏng hơn và mở ra, nhưng mẹ cũng không thể cảm nhận được nó. Trong lần hẹn khám tiếp theo, bác sĩ sẽ kiểm tra tử cung của mẹ để xác định độ mỏng để dự đoán thời điểm bắt đầu chuyển dạ. Tiết dịch nhầy: Khi cổ tử cung mỏng đi, mẹ có thể bắt đầu nhận thấy dịch tiết nhầy từ âm đạo có lẫn máu, cho thấy các mạch máu ở cổ tử cung bị vỡ khi cơ thể mẹ đang chuẩn bị chuyển dạ.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Mẹ có thể bắt đầu lập kế hoạch việc cho con bú vú và bú bình, đồng thời mua các thiết bị và dụng cụ cần thiết để hỗ trợ mẹ. Trữ sữa mẹ trong bình: Sữa mẹ không tốn kém và đầy đủ dinh dưỡng tối ưu mà con của mẹ cần. Sữa mẹ chứa các kháng thể bảo vệ bé khỏi dị ứng và bệnh tật mà sữa công thức không có. Nếu mẹ không thể cho con bú vú mẹ thường xuyên, mẹ có thể cân nhắc hút sữa mẹ và trữ trong tủ cấp đông và sau đó cho con của mẹ bú bình dần. Các vấn đề khi cho con bú vú: Nếu mẹ gặp bất cứ vấn đề gì khi cho con bú vú, mẹ nên nhờ đến sự trợ giúp của nữ hộ sinh, bác sĩ hoặc chuyên gia về nuôi con bằng sữa mẹ càng sớm càng tốt.',
      },
    ],
  },
  {
    week: 38,
    title: 'Tuần thai kỳ thứ 38',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Mắt và tóc của con của mẹ giờ đây đã có sắc tố và phổi tiếp tục sản xuất chất hoạt động bề mặt.',
      },
      {
        type: 'paragraph',
        text: 'Mẹ có thể chuyển dạ bất cứ lúc nào, vì vậy nếu có các cơn gò thường xuyên, xuất hiện dịch nhầy lẫn máu hoặc nước ối vỡ, hãy nhanh chóng đến bệnh viện.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Tại thời điểm này, chu vi đầu và bụng của con của mẹ gần như bằng nhau. Móng chân dài chạm đến đầu ngón chân, lông măng gần như biến mất. Lúc này con của mẹ nặng khoảng 2,8 kg và dài khoảng 49cm – kích thước bằng một quả bí ngô. Màu mắt: Mắt của con của mẹ hiện đã có sắc tố nhưng màu mắt có thể tiếp tục thay đổi khi tròng mắt bắt đầu dự trữ nhiều sắc tố hơn trong năm đầu tiên. Melanin là sắc tố tạo màu cho mắt, da và tóc. Vì vậy, màu mắt của bé khi mới sinh – xanh, nâu hoặc đen phụ thuộc vào mức độ sắc tố melanin tại thời điểm đó. Một số trẻ sơ sinh có màu mắt xanh lam khi sinh vì lượng sắc tố melanin thấp và hầu hết trẻ sơ sinh không có nhiều sắc tố melanin khi mới sinh. Nhưng khi con của mẹ lớn lên, nhiều sắc tố được thêm vào và màu mắt sẽ thay đổi. Phổi: Lúc này con của mẹ tiếp tục sản xuất chất hoạt động bề mặt giúp ngăn các phế nang trong phổi không xẹp khi thở. Tại thời điểm này, con của mẹ có đủ chất hoạt động bề mặt để có thể thở bình thường sau sinh.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Nếu mẹ có triệu chứng mờ mắt, buồn nôn, nhức đầu dai dẳng hoặc đau dạ dày dữ dội, mẹ cần đến khám thai để có thể kiểm tra huyết áp và đạm trong nước tiểu. Những dấu hiệu này là biểu hiện của tiền sản giật, liên quan đến các biến chứng phức tạp cho cả mẹ và con của mẹ .',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Mẹ có thể muốn tìm bác sĩ nhi khoa, người sẽ chăm sóc con của mẹ khi chào đời. Đây là một thời điểm tốt để làm điều đó. Bác sĩ nhi khoa có thể sẽ là bác sĩ chăm sóc bé trong vài năm tới, do đó hãy tìm một bác sĩ mà mẹ cảm thấy tin tưởng. Nếu không, mẹ có thể yêu cầu bệnh viện đề xuất một bác sĩ nhi khoa khác. Tìm hiểu về chứng trầm cảm sau sinh: Mặc dù mẹ rất mong chờ con của mẹ chào đời tràn đầy niềm vui, nhưng sau sinh mẹ có thể cảm thấy buồn và ủ rũ, đây là chứng trầm cảm sau sinh. Trầm cảm sau sinh có nhiều dạng, từ trầm cảm nhẹ như Baby Blues, tự khỏi mà không cần điều trị cho đến trầm cảm nặng sau sinh. Mẹ hãy chú ý các dấu hiệu và triệu chứng của chứng trầm cảm sau sinh và tìm kiếm sự trợ giúp nếu mẹ cảm thấy chán nản.',
      },
    ],
  },
  {
    week: 39,
    title: 'Tuần thai kỳ thứ 39',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Chúc mừng mẹ! Giờ đây con của mẹ đã là em bé đủ tháng! Để tạo điều kiện thuận lợi cho con của mẹ di chuyển xuống và kích thích quá trình chuyển dạ,',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Nếu ra đời vào tuần này, con của mẹ chính thức được coi là bé sinh đủ tháng. Bé có thể nghe thấy giọng nói của mẹ: con của mẹ đã có thể nhận ra giọng nói của mẹ và não vẫn đang tiếp tục phát triển cho đến cả sau sinh. Khóc không nước mắt: Tuyến lệ, một tuyến tạo nước mắt đã hoàn thiện quá trình phát triển nhưng các ống dẫn nước mắt vẫn đang hình thành. Vì vậy, con của mẹ sẽ không có nước mắt chảy ra khi khóc. Sẽ mất vài tháng để quá trình này hoàn thành. Lúc này con của mẹ nặng khoảng 3kg và dài khoảng 50cm – kích thước bằng một quả dưa hấu nhỏ.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Càng về cuối thai kỳ, lượng dịch tiết âm đạo càng tăng. Nếu chất dịch đặc và chứa chất nhầy lẫn máu, đó có thể là máu báo, nghĩa là cổ tử cung đã bắt đầu cho quá trình chuyển dạ. Vì con của mẹ di chuyển xuống gần xương chậu hơn, mẹ có thể cảm thấy đau lưng hơn và nhiều áp lực hơn ở vùng bụng dưới. Mẹ hãy đi khám bác sĩ nếu xuất hiện những cơn gò kéo dài hơn 60 giây và cách nhau cứ sau 5 phút. Khi mẹ đợi quá trình chuyển dạ bắt đầu, hãy tiếp tục theo dõi các cử động của con của mẹ . Số lần cử động giảm đột ngột có thể có thể là dấu hiệu cho thấy con của mẹ không được khỏe và mẹ phải thông báo với bác sĩ ngay lập tức.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Nếu bác sĩ cảnh báo rằng con của mẹ đang trở nên quá to, mẹ có thể được khuyên nên giảm lượng đường tiêu thụ để tránh thai nhi phát triển quá lớn. Sẵn sàng cho tuần đầu tiên: Tuần đầu tiên sau sinh thường luôn luôn bận rộn, vì vậy mẹ nên chuẩn bị nhà cửa, gia đình và bản thân sẵn sàng cho thời điểm con của mẹ về nhà. Trong giai đoạn này, con của mẹ có thể khóc nhiều và mẹ hãy sẵn sàng đáp lại bé. Trước khi bé tập đi, khóc là cách duy nhất để bé có thể giao tiếp với mẹ về cơn đói, khó chịu cũng như các nhu cầu khác. Tìm hiểu về cách nuôi dạy con tích cực: Mẹ có thể muốn dành thời gian đọc về cách nuôi dạy con tích cực. Ví dụ, hình phạt có thể ngăn chặn những hành vi xấu ngay lập tức nhưng nó không dạy cho con cách ứng xử tốt. Trẻ nhỏ không có hiểu một cách logic và kết nối giữa sự tức giận của chúng và cách chúng nên cư xử vào lần tới. Ngoài ra, mẹ cũng nên nhớ rằng con của mẹ chỉ có thể học cách tự kiểm soát khi não trước đã hoàn thiện, điều phải diễn ra trong nhiều năm tới. Trừng phạt có thể làm tổn thương con nhiều hơn cũng như ảnh hưởng tiêu cực đến mối quan hệ của con với mẹ. Vì vậy, tốt hơn hết, bố mẹ nên tìm cách khác để nuôi dạy con của mẹ thành một người trưởng thành khỏe mạnh và có trách nhiệm. Chính vì lý do này mà nhiều chuyên gia trong lĩnh vực phát triển trẻ em đều khuyên mẹ nuôi dạy con cái theo hướng tích cực.',
      },
    ],
  },
  {
    week: 40,
    title: 'Tuần thai kỳ thứ 40',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'Chúc mừng mẹ! con của mẹ lúc này dã phát triển hoàn toàn, con đã sẵn sàng chào đời bất cứ lúc nào.',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Mặc dù con của mẹ đã sẵn sàng chào đời nhưng móng tay và tóc vẫn tiếp tục dài ra, phổi vẫn đang phát triển và mỡ sẽ tích tụ ngày càng nhiều. Hình dạng đầu: Đầu của con của mẹ vẫn là phần lớn nhất của cơ thể cần đi qua đường dẫn sinh. Để giúp cho việc sinh nở dễ dàng hơn, các xương sọ vẫn chưa hợp nhất và sẽ có thể thu lại để bé đi qua đường dẫn sinh khi chuyển dạ. Vì vậy sau sinh đầu của con của mẹ có thể có hình nón, nhưng sau một thời gian sẽ trở lại bình thường. Giọng nói quen thuộc của mẹ: Không có âm thanh nào hấp dẫn con của mẹ như giọng nói của mẹ và điều thú vị là bé đã học hỏi rất nhiều từ giọng nói của mẹ trong suốt thời gian qua. Vì vậy, mẹ hãy cố gắng nói chuyện thường xuyên với con của mẹ sau sinh, điều này sẽ trấn an con. Mỡ tiếp tục tăng: Lượng mỡ trắng chiếm khoảng 16% trọng lượng cơ thể tại thời điểm này và con của mẹ bổ sung khoảng 14 gram chất béo mỗi ngày trong suốt những tuần cuối này. Lúc này con của mẹ nặng khoảng 3 – 3.5 kg và dài khoảng 50cm – kích thước bằng một quả mít.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Cổ tử cung tiếp tục mở ra và mỏng đi, mẹ sẽ tiếp tục có những cơn gò cho đến khi mẹ chuyển dạ. Mẹ nên tiếp tục chú ý các triệu chứng của bản thân. Lưng của mẹ có thể vẫn bị đau, vì vậy mẹ nên nghỉ ngơi đầy đủ. Chỉ rất nhanh thôi mẹ sẽ được gặp con. Nếu vào cuối tuần này quá trình chuyển dạ vẫn chưa bắt đầu, bác sĩ có thể thảo luận với mẹ các biện pháp giục sinh. Tuy nhiên, các bác sĩ thường không đề nghị kích thích giục sinh trừ khi mẹ và con của mẹ có nguy cơ nhiễm trùng do mang thai kéo dài và thai nhi quá to.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm lúc này' },
      {
        type: 'paragraph',
        text: 'Mẹ nên tham khảo ý kiến bác sĩ về việc nên làm gì sau sinh. Không quấy rầy trong giờ đầu tiên: Nhiều bệnh viện ở Anh, Mỹ và Đức đã bắt đầu đặt bé lên vú ngay sau khi sinh để gắn kết và cho con bú, một phương pháp được gọi là không quấy rầy trong giờ đầu tiên. Chỉ sau 1-2 giờ bé sẽ được đưa đi tắm và khám sức khỏe tổng quát. Mặc dù cách làm này không phổ biến ở các quốc gia Châu Á, mẹ có thể thảo luận với bác sĩ của mình nếu có thể có thời gian đặc biệt này với con của mẹ trước khi được đưa đi tắm và kiểm tra sức khỏe.',
      },
    ],
  },
  {
    week: 41,
    title: 'Tuần thai kỳ thứ 41',
    subtitle: WEEKLY_PREGNANCY_SUBTITLE,
    body: [
      {
        type: 'italic',
        text: 'con của mẹ có thể vẫn còn rất thích ở trong bụng mẹ và điều này không có gì bất thường. Mặc dù quá trình chuyển dạ có thể bắt đầu bất cứ lúc nào, mẹ',
      },
      { type: 'heading', text: 'Sự phát triển của con của mẹ' },
      {
        type: 'paragraph',
        text: 'Lúc này bé đã phát triển hoàn toàn và chỉ tăng thêm trọng lượng. Theo định nghĩa, con của mẹ hiện giờ được coi là em bé sinh đủ tháng. Xét nghiệm: Để đánh giá tình trạng sức khỏe của con của mẹ , bác sĩ có thể yêu cầu mẹ tiến hành một số xét nghiệm như sử dụng máy theo dõi thai nhi điện tử, xét nghiệm non-stress test hoặc đánh giá phát triển sinh lý thai nhi. Các xét nghiệm này có thể được thực hiện hàng tuần hoặc hai tuần một lần. Bộ phận sinh dục: Do nội tiết tố trong cơ thể mẹ, bộ phận sinh dục của bé có thể sưng lên khi sinh, nhưng chúng sẽ sớm trở lại kích thước bình thường.',
      },
      { type: 'heading', text: 'Sự thay đổi của mẹ' },
      {
        type: 'paragraph',
        text: 'Nếu không có bất kỳ rủi ro nào cho sức khỏe của mẹ và con của mẹ , mẹ chỉ cần chờ quá trình chuyển dạ tự nhiên. Tách màng ối: Nếu mẹ đã từng sinh con trước đó, mẹ sẽ được đề nghị quét màng ối vào lần hẹn khám thai trong tuần thứ 41. Tách màng ối được thực hiện qua thăm khám âm đạo (bên trong), bác sĩ sẽ sử dụng các ngón tay để kích thích cổ tử cung để cổ tử cung sản sinh ra các hormone có thể kích thích quá trình chuyển dạ tự nhiên. Nếu mẹ không muốn thực hiện thủ thuật này, mẹ có thể thảo luận với nữ hộ sinh. Tuy nhiên, mẹ có thể vẫn còn những triệu chứng của tam cá nguyệt thứ ba như mệt mỏi, phù và táo bón. Mẹ có thể đi bộ nhẹ nhàng giúp thuyên giảm các triệu chứng vì đi bộ giúp máu lưu thông tốt hơn. Sự thực là việc đi bộ dài và duy trì hoạt động tích cực có thể kích thích quá trình sinh nở tự nhiên, khiến con của mẹ chào đời sớm hơn.',
      },
      { type: 'heading', text: 'Những việc mẹ có thể làm' },
      {
        type: 'paragraph',
        text: 'Mẹ hãy thăm khám bác sĩ hoặc nữ hộ sinh ít nhất một tuần một lần nếu con của mẹ không chào đời trong tuần này. Các trẻ sinh sau tuần 41 có thể to hơn, gây khó khăn cho việc sinh thường. Do đó, có khả năng các bác sĩ sẽ thảo luận về khả năng giục sinh nếu con của mẹ không ra đời trước cuối tuần.',
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
