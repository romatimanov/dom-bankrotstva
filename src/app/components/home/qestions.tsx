import style from 'app/styles/home.module.css'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'

export function Qestions() {
  return (
    <section className={style.qestions}>
      <div className="container">
        <div className="text-group">
          <h2 className="global-subtitle">
            ЧАСТО ЗАДАВАЕМЫЕ <br /> ВОПРОСЫ
          </h2>
          <p className={style.text}>Лучше дважды спросить, чем один раз напутать.</p>
        </div>

        <Accordion.Root type="single" collapsible className={style.AccordionRoot}>
          <Accordion.Item value="item-1" className={style.AccordionItem}>
            <Accordion.Header className={style.AccordionHeader}>
              <Accordion.Trigger className={style.AccordionTrigger}>
                Правда ли, что спишут все кредиты?
                <ChevronDownIcon className={style.AccordionChevron} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={style.AccordionContent}>
              <div className={style.AccordionContentText}>
                Нет, не все. Суд может списать только те долги, которые признают невозможными к
                погашению. Алименты, штрафы, возмещение вреда жизни/здоровью и некоторые другие
                обязательства не списываются.
              </div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2" className={style.AccordionItem}>
            <Accordion.Header className={style.AccordionHeader}>
              <Accordion.Trigger className={style.AccordionTrigger}>
                Что будет с моим имуществом?
                <ChevronDownIcon className={style.AccordionChevron} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={style.AccordionContent}>
              <div className={style.AccordionContentText}>
                Дом, автомобиль, земельный участок… Никому не хочется расставаться с нажитым
                имуществом, даже при наличии долгов. В 90% случаев наши специалисты помогают
                сохранить ценное имущество, не говоря о предметах быта. Подробнее сможем ответить на
                бесплатной консультации.
              </div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-3" className={style.AccordionItem}>
            <Accordion.Header className={style.AccordionHeader}>
              <Accordion.Trigger className={style.AccordionTrigger}>
                Смогу ли я взять кредит после банкротства?
                <ChevronDownIcon className={style.AccordionChevron} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={style.AccordionContent}>
              <div className={style.AccordionContentText}>
                Да, но не сразу. После завершения банкротства (обычно через 5 лет с момента списания
                долгов) банки смогут рассматривать вашу заявку. Однако условия будут жестче, а
                процентные ставки — выше.
              </div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-4" className={style.AccordionItem}>
            <Accordion.Header className={style.AccordionHeader}>
              <Accordion.Trigger className={style.AccordionTrigger}>
                Смогу ли я работать во время и после банкротства?
                <ChevronDownIcon className={style.AccordionChevron} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={style.AccordionContent}>
              <div className={style.AccordionContentText}>
                Да. Банкротство не запрещает работать, но есть нюансы: для физлиц: ограничений нет;
                для ИП/бизнеса: возможны ограничения на руководящие должности (на 1–3 года).
              </div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-5" className={style.AccordionItem}>
            <Accordion.Header className={style.AccordionHeader}>
              <Accordion.Trigger className={style.AccordionTrigger}>
                Как происходит банкротство при наличии ипотеки?{' '}
                <ChevronDownIcon className={style.AccordionChevron} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={style.AccordionContent}>
              <div className={style.AccordionContentText}>
                При банкротстве с ипотекой квартира может быть продана на торгах, если она не
                является единственным жильём или превышает нормы по площади/стоимости в регионе, а
                вырученные средства пойдут на погашение долга, но если жильё единственное и
                соответствует установленным критериям, его могут сохранить, хотя банк вправе
                требовать изменения условий платежей или оспаривать решение суда.
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </section>
  )
}
