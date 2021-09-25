import { ObjectType, Field,  Query,  Resolver,  Arg,  InputType,  ID,  Mutation } from "type-graphql";
import { Notifications } from '../models/index';

@ObjectType()
class Notification {
    
    @Field(() => ID)
    id: string

    @Field()
    title: string

    @Field()
    text: string

    @Field()
    notificationImage: string

}

@InputType()
class NotificationInput {

    @Field()
    title: string

    @Field()
    text: string

    @Field()
    notificationImage: string
}

@Resolver()
export default class NotificationResolver {

    //notification querry

    @Query(() => [Notification])
    async Notifications(): Promise < Notification[] > {
        return (await Notifications.find()) as any;
    }

    @Query(() => Notification)
    async Notification(@Arg("id") id: String): Promise < Notification > {
        return (await Notifications.findById(id)) as any;
    }

    //Notification Mutation

    @Mutation(() => Notification)
    async sendNotification(@Arg("data") newNotification: NotificationInput): Promise < Notification > {
        return (await Notifications.create(newNotification)) as any;
    }

    @Mutation(() => Notification)
    async deleteNotification(@Arg("id") id: string): Promise < Notification > {
        return (await Notifications.findByIdAndRemove(id)) as any;
    }

}