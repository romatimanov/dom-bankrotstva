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
              <div className={style.AccordionContentText}>Ответ на второй вопрос</div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2" className={style.AccordionItem}>
            <Accordion.Header className={style.AccordionHeader}>
              <Accordion.Trigger className={style.AccordionTrigger}>
                Правда ли, что спишут все кредиты?
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
              <div className={style.AccordionContentText}>Ответ на второй вопрос</div>
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
              <div className={style.AccordionContentText}>Ответ на второй вопрос</div>
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
              <div className={style.AccordionContentText}>Ответ на второй вопрос</div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </section>
  )
}
